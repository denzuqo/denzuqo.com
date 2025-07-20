"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function PageClient() {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let fontSize = window.innerWidth < 768 ? 18 : 24;
    const chars = ["•", "Ł", "₿", "", "", "", ""];

    const noise = (x: number, y: number, t: number): number =>
      Math.sin(x * 0.1 + t) * Math.cos(y * 0.15 + t * 1.3) +
      Math.sin(x * 0.5 + t * 1.5) * Math.cos(y * 0.3 + t * 0.7);

    const fractalNoise = (x: number, y: number, t: number): number => {
      let value = 1;
      let amplitude = 2;
      let frequency = 0.15;
      let max = 0;
      for (let i = 4; i > 1; i--) {
        value += amplitude * noise(x * frequency, y * frequency, t);
        max += amplitude;
        amplitude *= 1;
        frequency *= 2;
      }
      return value / max;
    };

    let cols: number;
    let rows: number;
    let time = 0;

    const resize = () => {
      fontSize = window.innerWidth < 768 ? 18 : 24;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      rows = Math.floor(canvas.height / fontSize);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = fractalNoise(x, y, time);
          let norm = (n + 1) / 2;
          norm = Math.min(1, Math.max(0, norm));
          let charIndex = Math.floor(norm * (chars.length - 1));
          charIndex = Math.min(chars.length - 1, Math.max(0, charIndex));
          const ch = chars[charIndex];

          if (ch === "Ł") {
            ctx.fillStyle = "#57606f";
          } else if (ch === "•") {
            ctx.fillStyle = "#a4b0be";
          } else {
            ctx.fillStyle = "orange";
          }

          ctx.fillText(ch, x * fontSize, y * fontSize);
        }
      }

      time += 0.005;
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);  

  return (
      <>
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1,
            display: "block",
            background: "white",
            imageRendering: "pixelated",
          }}
        />
        <div className="flex min-h-screen w-full justify-center items-center">
          <div className="p-6">
              <div className="flex justify-center items-center">
                <div className="flex w-fit gap-2 justify-center items-center py-2 px-6 border border-slate-600 rounded-full bg-white/30 backdrop-blur-md">
                  <Image
                    src="/img/logo.png"
                    alt="denzuqo"
                    width={32}
                    height={32}
                    className="w-[32px]"
                  />
                  <p className="font-semibold text-2xl txet-slate-600">
                    Denzuqo
                  </p>
                </div>
              </div>
              <div className="mx-auto max-w-2xl flex flex-col w-full my-6 bg-white/30 backdrop-blur-md shadow-sm border border-slate-200 rounded-lg">
                <div className="m-4 ">
                  <div className="mx-2 my-2 flex flex-col gap-3 overflow-hidden text-gray-700 shadow-none md:flex-row">
                    <Image
                      src="/img/denzuqo.jpeg"
                      alt="denzuqo"
                      width={64}
                      height={64}
                      className="border border-slate-200 shadow-md inline-block object-cover object-center w-16 h-16 rounded-lg"
                    />
                    <div>
                      <h6 className="block text-base font-semibold leading-relaxed tracking-normal text-gray-900">
                        Who I Am
                      </h6>
                      <p className="block w-full text-sm font-normal leading-normal text-gray-700 text-justify">
                        I was born in Java during Indonesia monetary crisis under President Soeharto. Despite growing up with limitations, I found passion in open-source technology, which has shaped my journey ever since.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-y-1 border-slate-200">
                  <div className="h-3 w-full border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-slate-800)]/15"></div>
                </div>
                <div className="mx-4 my-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                  {[
                    { name: "Windows OS", since: "2004" },
                    { name: "VB 6.0", since: "2008" },
                    { name: "Delphi", since: "2009" },
                    { name: "HTTP Injector", since: "2009" },
                    { name: "Linux OS", since: "2009" },
                    { name: "XML", since: "2009" },
                    { name: "HTML", since: "2009" },
                    { name: "CSS", since: "2009" },
                    { name: "JavaScript", since: "2009" },
                    { name: "PHP", since: "2009" },
                    { name: "SQL", since: "2009" },
                    { name: "DVWA", since: "2011" },
                    { name: "cPanel", since: "2011" },
                    { name: "Web Defacement", since: "2011" },
                    { name: "Email Spoofing", since: "2011" },
                    { name: "Assembly", since: "2012" },
                    { name: "C++", since: "2012" },
                    { name: "Java", since: "2013" },
                    { name: "Python", since: "2014" },
                    { name: "Git", since: "2016" },
                    { name: "Android Dev", since: "2016" },
                    { name: "React", since: "2016" },
                    { name: "Docker", since: "2017" },
                    { name: "Go", since: "2018" },
                    { name: "Cloud Computing", since: "2018" },
                    { name: "Machine Learning", since: "2018" },
                    { name: "Deep Learning", since: "2018" },
                    { name: "CI/CD", since: "2019" },
                    { name: "Rust", since: "2020" },
                    { name: "Web3", since: "2021" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex bg-white flex-col rounded-md border border-slate-200 p-3 shadow-md">
                      <p className="font-semibold text-sm text-gray-900">{item.name}</p>
                      <p className="block w-full text-xs font-normal leading-normal text-gray-700">
                        Since {item.since}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </>
  );
}
