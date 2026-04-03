"use client";

import { useEffect, useRef, useState } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const PREVIEW_SIZE = 4;
const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const TOUCH_SEQUENCE = KONAMI_SEQUENCE.slice(0, 8);

const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const SCORE_TABLE = [0, 100, 300, 500, 800];
const PIECE_TYPES = Object.keys(TETROMINOES);

function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));
}

function cloneShape(shape) {
  return shape.map((row) => [...row]);
}

function randomPieceType() {
  return PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
}

function createPiece(type) {
  const shape = cloneShape(TETROMINOES[type]);

  return {
    type,
    shape,
    x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
    y: 0,
  };
}

function rotateShape(shape) {
  return Array.from({ length: shape[0].length }, (_, column) =>
    Array.from({ length: shape.length }, (_, row) => shape[shape.length - 1 - row][column]),
  );
}

function collides(board, piece, offsetX = 0, offsetY = 0, nextShape = piece.shape) {
  for (let y = 0; y < nextShape.length; y += 1) {
    for (let x = 0; x < nextShape[y].length; x += 1) {
      if (!nextShape[y][x]) {
        continue;
      }

      const boardX = piece.x + x + offsetX;
      const boardY = piece.y + y + offsetY;

      if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
        return true;
      }

      if (boardY >= 0 && board[boardY][boardX] !== 0) {
        return true;
      }
    }
  }

  return false;
}

function mergePiece(board, piece) {
  const nextBoard = board.map((row) => [...row]);

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) {
        return;
      }

      const boardY = piece.y + y;
      if (boardY >= 0) {
        nextBoard[boardY][piece.x + x] = piece.type;
      }
    });
  });

  return nextBoard;
}

function clearLines(board) {
  const remainingRows = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = BOARD_HEIGHT - remainingRows.length;

  const nextBoard = [
    ...Array.from({ length: cleared }, () => Array(BOARD_WIDTH).fill(0)),
    ...remainingRows,
  ];

  return { board: nextBoard, cleared };
}

function createInitialGame() {
  return {
    board: createEmptyBoard(),
    piece: createPiece(randomPieceType()),
    nextType: randomPieceType(),
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    paused: false,
  };
}

function lockPiece(state, piece = state.piece) {
  const mergedBoard = mergePiece(state.board, piece);
  const { board, cleared } = clearLines(mergedBoard);
  const totalLines = state.lines + cleared;
  const nextPiece = createPiece(state.nextType);
  const gameOver = collides(board, nextPiece);

  return {
    ...state,
    board,
    piece: nextPiece,
    nextType: randomPieceType(),
    score: state.score + SCORE_TABLE[cleared] * state.level,
    lines: totalLines,
    level: Math.floor(totalLines / 10) + 1,
    gameOver,
  };
}

function stepGame(state) {
  if (state.paused || state.gameOver) {
    return state;
  }

  if (!collides(state.board, state.piece, 0, 1)) {
    return {
      ...state,
      piece: {
        ...state.piece,
        y: state.piece.y + 1,
      },
    };
  }

  return lockPiece(state);
}

function movePiece(state, direction) {
  if (state.paused || state.gameOver || collides(state.board, state.piece, direction, 0)) {
    return state;
  }

  return {
    ...state,
    piece: {
      ...state.piece,
      x: state.piece.x + direction,
    },
  };
}

function softDropPiece(state) {
  if (state.paused || state.gameOver) {
    return state;
  }

  if (!collides(state.board, state.piece, 0, 1)) {
    return {
      ...state,
      piece: {
        ...state.piece,
        y: state.piece.y + 1,
      },
      score: state.score + 1,
    };
  }

  return lockPiece(state);
}

function hardDropPiece(state) {
  if (state.paused || state.gameOver) {
    return state;
  }

  let distance = 0;
  let nextPiece = state.piece;

  while (!collides(state.board, nextPiece, 0, 1)) {
    nextPiece = {
      ...nextPiece,
      y: nextPiece.y + 1,
    };
    distance += 1;
  }

  return lockPiece(
    {
      ...state,
      score: state.score + distance * 2,
    },
    nextPiece,
  );
}

function rotatePiece(state) {
  if (state.paused || state.gameOver) {
    return state;
  }

  const rotated = rotateShape(state.piece.shape);
  const kicks = [0, -1, 1, -2, 2];

  for (const offset of kicks) {
    if (!collides(state.board, state.piece, offset, 0, rotated)) {
      return {
        ...state,
        piece: {
          ...state.piece,
          x: state.piece.x + offset,
          shape: rotated,
        },
      };
    }
  }

  return state;
}

function buildDisplayBoard(board, piece) {
  const nextBoard = board.map((row) => [...row]);

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) {
        return;
      }

      const boardY = piece.y + y;
      const boardX = piece.x + x;

      if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
        nextBoard[boardY][boardX] = piece.type;
      }
    });
  });

  return nextBoard;
}

function buildPreviewGrid(type) {
  const preview = Array.from({ length: PREVIEW_SIZE }, () => Array(PREVIEW_SIZE).fill(0));
  const shape = TETROMINOES[type];
  const offsetX = Math.floor((PREVIEW_SIZE - shape[0].length) / 2);
  const offsetY = Math.floor((PREVIEW_SIZE - shape.length) / 2);

  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        preview[offsetY + y][offsetX + x] = type;
      }
    });
  });

  return preview;
}

function isEditableTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  );
}

export default function KonamiTetris() {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState(createInitialGame);
  const sequenceIndex = useRef(0);
  const touchSequenceIndex = useRef(0);
  const touchStart = useRef(null);

  const board = buildDisplayBoard(game.board, game.piece);
  const previewGrid = buildPreviewGrid(game.nextType);

  const openGame = () => {
    sequenceIndex.current = 0;
    touchSequenceIndex.current = 0;
    setGame(createInitialGame());
    setIsOpen(true);
  };

  const advanceKeyboardSequence = (inputKey) => {
    const expectedKey = KONAMI_SEQUENCE[sequenceIndex.current];

    if (inputKey === expectedKey) {
      sequenceIndex.current += 1;

      if (sequenceIndex.current === KONAMI_SEQUENCE.length) {
        openGame();
      }
    } else {
      sequenceIndex.current = inputKey === KONAMI_SEQUENCE[0] ? 1 : 0;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen && isEditableTarget(event.target)) {
        return;
      }

      if (isOpen) {
        if (event.key === "Escape") {
          event.preventDefault();
          setIsOpen(false);
          return;
        }

        if (event.key === "p" || event.key === "P") {
          event.preventDefault();
          setGame((current) => ({
            ...current,
            paused: current.gameOver ? current.paused : !current.paused,
          }));
          return;
        }

        if (game.gameOver) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setGame(createInitialGame());
          }
          return;
        }

        if (game.paused) {
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setGame((current) => movePiece(current, -1));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setGame((current) => movePiece(current, 1));
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setGame((current) => softDropPiece(current));
        } else if (event.key === "ArrowUp" || event.key === "x" || event.key === "X") {
          event.preventDefault();
          setGame((current) => rotatePiece(current));
        } else if (event.key === " ") {
          event.preventDefault();
          setGame((current) => hardDropPiece(current));
        }

        return;
      }

      const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      advanceKeyboardSequence(normalizedKey);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [game.gameOver, game.paused, isOpen]);

  useEffect(() => {
    const handleHintInput = (event) => {
      if (isOpen) {
        return;
      }

      const detail = event.detail;
      if (!detail || typeof detail.key !== "string") {
        return;
      }

      advanceKeyboardSequence(detail.key);
    };

    window.addEventListener("mirror-konami-input", handleHintInput);
    return () => window.removeEventListener("mirror-konami-input", handleHintInput);
  }, [isOpen]);

  useEffect(() => {
    const handleUnlock = () => {
      if (!isOpen) {
        openGame();
      }
    };

    window.addEventListener("mirror-konami-unlock", handleUnlock);
    return () => window.removeEventListener("mirror-konami-unlock", handleUnlock);
  }, [isOpen]);

  useEffect(() => {
    const handleTouchStart = (event) => {
      if (isOpen || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event) => {
      if (isOpen || !touchStart.current) {
        return;
      }

      const touch = event.changedTouches[0];
      if (!touch) {
        return;
      }

      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      touchStart.current = null;

      const threshold = 42;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
        return;
      }

      const direction =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? "ArrowRight"
            : "ArrowLeft"
          : dy > 0
            ? "ArrowDown"
            : "ArrowUp";

      const expectedDirection = TOUCH_SEQUENCE[touchSequenceIndex.current];

      if (direction === expectedDirection) {
        touchSequenceIndex.current += 1;

        if (touchSequenceIndex.current === TOUCH_SEQUENCE.length) {
          openGame();
        }
      } else {
        touchSequenceIndex.current = direction === TOUCH_SEQUENCE[0] ? 1 : 0;
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || game.paused || game.gameOver) {
      return undefined;
    }

    const speed = Math.max(140, 700 - (game.level - 1) * 55);
    const interval = window.setInterval(() => {
      setGame((current) => stepGame(current));
    }, speed);

    return () => window.clearInterval(interval);
  }, [game.gameOver, game.level, game.paused, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="konami-overlay" role="dialog" aria-modal="true" aria-label="Hidden Tetris game">
      <div className="konami-shell">
        <div className="konami-stage">
          <div className="konami-topline">
            <p className="konami-label">Mirror Mode</p>
            <button
              type="button"
              className="konami-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close hidden game"
            >
              Close
            </button>
          </div>

          <div className="konami-board-frame">
            <div className="konami-board" role="grid" aria-label="Tetris board">
              {board.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <div
                    key={`${rowIndex}-${cellIndex}`}
                    className={`konami-cell${cell ? ` is-filled piece-${cell}` : ""}`}
                  />
                )),
              )}
            </div>
          </div>
        </div>

        <aside className="konami-sidebar">
          <div className="konami-copy">
            <p className="section-label">Unlocked</p>
            <h2>Tetris</h2>
            <p>
              A hidden studio console. Arrow keys move, up rotates, space drops, P pauses.
            </p>
          </div>

          <div className="konami-stats" aria-label="Game stats">
            <div className="konami-stat">
              <span>Score</span>
              <strong>{game.score}</strong>
            </div>
            <div className="konami-stat">
              <span>Lines</span>
              <strong>{game.lines}</strong>
            </div>
            <div className="konami-stat">
              <span>Level</span>
              <strong>{game.level}</strong>
            </div>
          </div>

          <div className="konami-preview-wrap">
            <p className="konami-preview-label">Next</p>
            <div className="konami-preview">
              {previewGrid.map((row, rowIndex) =>
                row.map((cell, cellIndex) => (
                  <div
                    key={`preview-${rowIndex}-${cellIndex}`}
                    className={`konami-preview-cell${cell ? ` is-filled piece-${cell}` : ""}`}
                  />
                )),
              )}
            </div>
          </div>

          <div className="konami-status">
            <p>{game.gameOver ? "Game over" : game.paused ? "Paused" : "Active"}</p>
            <div className="konami-actions">
              <button
                type="button"
                className="button button-secondary konami-button"
                onClick={() =>
                  setGame((current) =>
                    current.gameOver ? createInitialGame() : { ...current, paused: !current.paused },
                  )
                }
              >
                {game.gameOver ? "Restart" : game.paused ? "Resume" : "Pause"}
              </button>
              <button
                type="button"
                className="button button-secondary konami-button"
                onClick={() => setGame(createInitialGame())}
              >
                Reset
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
