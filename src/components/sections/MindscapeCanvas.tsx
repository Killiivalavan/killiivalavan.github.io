'use client';

import { useEffect, useRef, useCallback } from 'react';

import { mindscapePool } from '@/data/mindscape';

// Grid configuration
const COLS = 6;
const ROWS = 6;
const IMAGE_WIDTH_VW = 10; // Zoomed out more
const IMAGE_HEIGHT_VW = (IMAGE_WIDTH_VW * 4) / 3; // 3:4 ratio (~13.3vw)
const GAP_VW = 6; // Reduced proportionally

// Build the tile images array (COLS * ROWS images per tile)
function buildTileImages(): Array<{ src: string; title: string }> {
  const items: Array<{ src: string; title: string }> = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const item = mindscapePool[i % mindscapePool.length];
    items.push({
      src: item.src,
      title: item.title,
    });
  }
  return items;
}

const tileImages = buildTileImages();



export default function InfiniteCanvas({
  imageWidth = `${IMAGE_WIDTH_VW}vw`,
  imageHeight = `${IMAGE_HEIGHT_VW}vw`,
  gap = `${GAP_VW}vw`,
  className = '',
}: {
  imageWidth?: string;
  imageHeight?: string;
  gap?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  
  // Position tracking
  const posRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const rafId = useRef<number>(0);
  
  // Tile dimensions (computed on mount)
  const tileDims = useRef({ width: 0, height: 0 });

  // Compute tile dimensions from vw units
  const computeTileDims = useCallback(() => {
    const vw = window.innerWidth / 100;
    const imgWidthPx = IMAGE_WIDTH_VW * vw;
    const imgHeightPx = IMAGE_HEIGHT_VW * vw;
    const gapPx = GAP_VW * vw;
    tileDims.current = {
      width: COLS * imgWidthPx + (COLS) * gapPx,
      height: ROWS * imgHeightPx + (ROWS) * gapPx,
    };
  }, []);

  // Wrap position to create infinite loop
  const wrapPosition = useCallback(() => {
    const { width, height } = tileDims.current;
    if (width === 0 || height === 0) return;
    
    // Modulo wrap
    posRef.current.x = ((posRef.current.x % width) + width) % width;
    posRef.current.y = ((posRef.current.y % height) + height) % height;
  }, []);

  // Apply transform
  const applyTransform = useCallback(() => {
    if (!draggableRef.current) return;
    wrapPosition();
    const { x, y } = posRef.current;
    // Offset by -tileWidth, -tileHeight so the 2x2 tiling covers all edges
    draggableRef.current.style.transform = `translate3d(${x - tileDims.current.width}px, ${y - tileDims.current.height}px, 0)`;
  }, [wrapPosition]);

  // Continuous animation loop for inertia and drift
  const animate = useCallback(() => {
    if (!isDragging.current) {
      // Apply friction
      const friction = 0.97;
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;

      // Stop completely if the movement is negligible
      if (Math.abs(velocityRef.current.x) < 0.05) velocityRef.current.x = 0;
      if (Math.abs(velocityRef.current.y) < 0.05) velocityRef.current.y = 0;

      // Add inertia velocity (no auto-drift)
      posRef.current.x += velocityRef.current.x;
      posRef.current.y += velocityRef.current.y;

      applyTransform();
    }
    
    rafId.current = requestAnimationFrame(animate);
  }, [applyTransform]);

  // Pointer handlers
  const handlePointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    velocityRef.current = { x: 0, y: 0 };
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);

    // Smooth out velocity and cap the max speed
    const MAX_SPEED = 10;
    const currentVelX = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dx * (16 / dt))); 
    const currentVelY = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dy * (16 / dt)));
    
    velocityRef.current.x = velocityRef.current.x * 0.5 + currentVelX * 0.5;
    velocityRef.current.y = velocityRef.current.y * 0.5 + currentVelY * 0.5;

    posRef.current.x += dx;
    posRef.current.y += dy;

    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;

    applyTransform();
  }, [applyTransform]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    // Inertia and drift will naturally take over in the animate loop
  }, []);

  // Wheel handler — adds momentum based on scroll intensity
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    // Add to velocity for a smooth scrolling effect — boosted for more "glide"
    velocityRef.current.x -= e.deltaX * 0.15;
    velocityRef.current.y -= e.deltaY * 0.15;
    
    // Also move position directly for immediate response
    posRef.current.x -= e.deltaX * 0.4;
    posRef.current.y -= e.deltaY * 0.4;
    
    // Clamp wheel-induced velocity too
    const MAX_WHEEL_VEL = 7.5; // Reduced by 50%
    velocityRef.current.x = Math.max(-MAX_WHEEL_VEL, Math.min(MAX_WHEEL_VEL, velocityRef.current.x));
    velocityRef.current.y = Math.max(-MAX_WHEEL_VEL, Math.min(MAX_WHEEL_VEL, velocityRef.current.y));
    
    applyTransform();
  }, [applyTransform]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    isDragging.current = true;
    lastPointer.current = { x: touch.clientX, y: touch.clientY };
    lastTime.current = Date.now();
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];

    const dx = touch.clientX - lastPointer.current.x;
    const dy = touch.clientY - lastPointer.current.y;
    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);

    const MAX_SPEED = 20; 
    const currentVelX = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dx * (16 / dt)));
    const currentVelY = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, dy * (16 / dt)));
    velocityRef.current.x = velocityRef.current.x * 0.5 + currentVelX * 0.5;
    velocityRef.current.y = velocityRef.current.y * 0.5 + currentVelY * 0.5;

    posRef.current.x += dx;
    posRef.current.y += dy;

    lastPointer.current = { x: touch.clientX, y: touch.clientY };
    lastTime.current = now;

    applyTransform();
  }, [applyTransform]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Setup and cleanup
  useEffect(() => {
    computeTileDims();
    
    // Center the initial view slightly
    posRef.current = {
      x: tileDims.current.width * 0.3,
      y: tileDims.current.height * 0.3,
    };
    applyTransform();

    const container = containerRef.current;
    if (!container) return;

    // Pointer events
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Wheel
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Touch
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    // Resize
    const handleResize = () => {
      computeTileDims();
      applyTransform();
    };
    window.addEventListener('resize', handleResize);

    // Start the unified animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId.current);
    };
  }, [
    computeTileDims, applyTransform, handlePointerDown, handlePointerMove,
    handlePointerUp, handleWheel, handleTouchStart, handleTouchMove,
    handleTouchEnd, animate,
  ]);

  // Render a single tile grid
  const renderTile = (key: string) => (
    <div
      key={key}
      className="grid shrink-0"
      style={{
        gridTemplateColumns: `repeat(${COLS}, ${imageWidth})`,
        gridTemplateRows: `repeat(${ROWS}, ${imageHeight})`,
        gap,
      }}
    >
      {tileImages.map((img, i) => (
        <div
          key={`${key}-${i}`}
          className="relative overflow-hidden rounded-xl group cursor-pointer"
          style={{ width: imageWidth, height: imageHeight }}
        >
          <img
            src={img.src}
            alt={img.title}
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-white text-xs font-semibold tracking-wider uppercase">
              {img.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden select-none ${className}`}
      style={{ cursor: 'grab', touchAction: 'none' }}
    >
      {/* 3x3 tiling for seamless infinite wrap in all directions */}
      <div
        ref={draggableRef}
        className="flex flex-col will-change-transform"
        style={{ gap }}
      >
        {[0, 1, 2].map((row) => (
          <div key={`row-${row}`} className="flex" style={{ gap }}>
            {[0, 1, 2].map((col) => renderTile(`tile-${row}-${col}`))}
          </div>
        ))}
      </div>
    </div>
  );
}
