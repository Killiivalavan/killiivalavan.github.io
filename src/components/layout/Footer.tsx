'use client';

import { useState, useEffect } from 'react';

const funnyQuotes = [
  "Life is like a computer - you can't have it all, you have to choose between RAM and storage.",
  "Why do Java developers wear glasses? Because they can't C#!",
  "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "Real programmers don't use backups, they post their stuff on github and let the rest of the world make copies.",
  "Operating systems are like underwear, nobody really wants to look at them.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "It's not a bug, it's an undocumented feature.",
  "A user interface is like a joke. If you have to explain it, it's not that good.",
  "If at first you don't succeed, call it version 1.0.",
  "There are only 10 types of people in the world - those who understand binary and those who don't.",
  "Hours of trial and error can save you minutes of reading documentation.",
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
];

export default function Footer() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Change quote on component mount (page refresh)
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funnyQuotes.length);
    setCurrentQuoteIndex(randomIndex);
  }, []);

  const handleQuoteClick = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * funnyQuotes.length);
    } while (newIndex === currentQuoteIndex && funnyQuotes.length > 1);
    setCurrentQuoteIndex(newIndex);
  };

  return (
    <footer className="py-4 mt-20 border-t border-border/20">
      <div className="container-custom">
        <div className="flex justify-center">
          <button
            onClick={handleQuoteClick}
            className="text-center text-muted-foreground cursor-pointer"
          >
            <p className="text-xs italic max-w-xl">
              "{funnyQuotes[currentQuoteIndex]}"
            </p>
          </button>
        </div>
      </div>
    </footer>
  );
}
