'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  showControls?: boolean;
  slidesToShow?: number;
  peekSize?: number;
  blurAmount?: number; // New prop for controlling blur amount
  autoPlay?: boolean;
  autoPlayInterval?: number;
  gap?: number;
  className?: string;
  slideClassName?: string;
}

export function Carousel({
  children,
  showControls = true,
  slidesToShow = 1,
  peekSize = 60, // Default peek size in pixels
  blurAmount = 3, // Default blur amount in pixels
  autoPlay = false,
  autoPlayInterval = 5000,
  gap = 24,
  className,
  slideClassName,
  ...props
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - 1); // Always max of total slides - 1 for peek carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Update container width on window resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [carouselRef]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  useEffect(() => {
    if (autoPlay && !isMouseOver) {
      const interval = setInterval(() => {
        if (currentIndex < maxIndex) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setCurrentIndex(0);
        }
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, currentIndex, isMouseOver, maxIndex]);
  
  // For peeking carousel
  const mainSlideWidth = containerWidth - (peekSize * 2);
  const slideWidthPercentage = mainSlideWidth / containerWidth * 100;
  const translateX = currentIndex * (mainSlideWidth + gap);

  return (
    <div
      className={cn('relative w-full', className)}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      {...props}
    >
      <div 
        ref={carouselRef}
        className="overflow-hidden px-4"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
            gap: `${gap}px`
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                'flex-shrink-0 transition-all duration-300', 
                currentIndex === index ? 'scale-100 opacity-100 z-10' : 'scale-95 opacity-80 z-0',
                slideClassName
              )}
              style={{ 
                width: `${mainSlideWidth}px`,
                marginLeft: index === 0 ? `${peekSize}px` : '0',
                marginRight: index === totalSlides - 1 ? `${peekSize}px` : '0',
                filter: currentIndex === index ? 'none' : `blur(${blurAmount}px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showControls && totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow-md backdrop-blur-sm hover:bg-background z-20"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow-md backdrop-blur-sm hover:bg-background z-20"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}

      {/* Optional slide indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index ? "bg-primary" : "bg-muted"
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 