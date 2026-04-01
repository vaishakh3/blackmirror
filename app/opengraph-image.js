import { ImageResponse } from "next/og";

export const alt = "Black Mirror Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#F2EEE7",
          position: "relative",
          padding: "42px",
          fontFamily: "Didot, Bodoni 72, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "28px",
            border: "1px solid rgba(242, 238, 231, 0.12)",
            borderRadius: "24px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "28px",
            background:
              "radial-gradient(circle at 46% 28%, rgba(255,255,255,0.09), transparent 20%)",
            borderRadius: "24px",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "34px",
              right: "34px",
              top: "34px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(242,238,231,0.22), rgba(242,238,231,0.04) 55%, rgba(242,238,231,0.22))",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "34px",
              right: "34px",
              bottom: "34px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(242,238,231,0.22), rgba(242,238,231,0.04) 55%, rgba(242,238,231,0.22))",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "34px",
              bottom: "34px",
              right: "286px",
              width: "1px",
              background: "rgba(242,238,231,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "620px",
              height: "620px",
              left: "210px",
              top: "2px",
              border: "1px solid rgba(242,238,231,0.08)",
              borderRadius: "50%",
              transform: "scaleX(1.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "410px",
              height: "410px",
              left: "318px",
              top: "106px",
              border: "1px solid rgba(242,238,231,0.1)",
              borderRadius: "50%",
              transform: "scaleX(0.92)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "52px 54px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(242, 238, 231, 0.62)",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            <span>blackmirror.studio</span>
            <span>Design and development agency</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "760px",
                lineHeight: 0.8,
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  fontSize: 156,
                  letterSpacing: "-0.07em",
                }}
              >
                BLACK
              </span>
              <span
                style={{
                  fontSize: 156,
                  letterSpacing: "-0.07em",
                  color: "rgba(242, 238, 231, 0.16)",
                  textShadow:
                    "0 0 0 rgba(242, 238, 231, 0.95), 0 0 20px rgba(242, 238, 231, 0.05)",
                }}
              >
                MIRROR
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "210px",
                gap: "20px",
                marginBottom: "12px",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(242,238,231,0.52)",
                }}
              >
                Services
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: 21,
                  lineHeight: 1.2,
                  color: "rgba(242,238,231,0.88)",
                }}
              >
                <span>Identity</span>
                <span>Digital</span>
                <span>Merch</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                maxWidth: "620px",
                fontSize: 32,
                fontStyle: "italic",
                lineHeight: 1.15,
                letterSpacing: "0.02em",
                color: "rgba(242, 238, 231, 0.84)",
              }}
            >
              Creative design and development agency building brands, websites,
              and limited merch.
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  letterSpacing: "0.26em",
                  color: "rgba(242,238,231,0.48)",
                }}
              >
                Independent studio
              </span>
              <span
                style={{
                  fontSize: 15,
                  letterSpacing: "0.26em",
                  color: "rgba(242,238,231,0.72)",
                }}
              >
                hello@blackmirror.studio
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
