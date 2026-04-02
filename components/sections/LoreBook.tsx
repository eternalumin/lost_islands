'use client';
import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the effect is only applied on the client side
  }, []);

  if (!isClient) {
    return null; // Prevent rendering of animation on the server side
  }

  return (
    <div
      style={{
        background: 'black',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: `'Share Tech Mono', monospace`,
      }}
    >
      <style>{`
        @keyframes glitch {
          0% {
            transform: none;
            opacity: 1;
          }
          15% {
            transform: skew(1deg, 1deg) translate(-10px, -5px);
            opacity: 0.8;
          }
          30% {
            transform: skew(-3deg, -1deg) translate(8px, 4px);
            opacity: 0.6;
          }
          45% {
            transform: skew(2deg, -5deg) translate(-12px, 10px);
            opacity: 0.75;
          }
          60% {
            transform: skew(-7deg, 5deg) translate(4px, -2px);
            opacity: 0.5;
          }
          75% {
            transform: skew(1deg, 2deg) translate(-6px, 6px);
            opacity: 0.7;
          }
          90% {
            transform: skew(-3deg, -6deg) translate(10px, -8px);
            opacity: 0.4;
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .glitch-text {
          font-size: 6rem;
          color: white;
          position: relative;
          animation: glitch 1s infinite;
          text-shadow:
            3px 3px 0 #00ffe0,
            -3px -3px 0 #ff00aa,
            2px -2px 0 #ff00aa,
            -2px 2px 0 #00ffe0;
          letter-spacing: 0.1em;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: 'Who Am I?';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
        }

        .glitch-text::before {
          color: #00ffe0;
          z-index: -1;
          animation: glitch 1s infinite;
          transform: translate(-5px, -5px);
          mix-blend-mode: screen;
        }

        .glitch-text::after {
          color: #ff00aa;
          z-index: -2;
          animation: glitch 1.2s infinite;
          transform: translate(5px, 5px);
          mix-blend-mode: screen;
        }

        .glitch-desc {
          color: #888;
          margin-top: 2rem;
          font-size: 1.25rem;
          letter-spacing: 1px;
          text-align: center;
          width: 80%;
          animation: glitch 1.5s infinite;
          text-shadow:
            2px 2px 0 #00ffe0,
            -2px -2px 0 #ff00aa,
            1px -1px 0 #ff00aa,
            -1px 1px 0 #00ffe0;
        }
      `}</style>

      <h1 className="glitch-text">Did it exist?</h1>
      <p className="glitch-desc">
        A digital anomaly... Echoing through code, stitched into timelines and torn realities.
      </p>
    </div>
  );
};

export default AboutPage;
