'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  duration?: number;
  visible: boolean;
  onClose: () => void;
  variant?: 'default' | 'success';
}

export function Toast({
  message,
  duration = 3000,
  visible,
  onClose,
  variant = 'success',
}: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <div className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg',
        'bg-card border border-border text-card-foreground',
        'animate-in fade-in-50 slide-in-from-bottom-5 duration-300'
      )}>
        {variant === 'success' && <CheckCircle size={16} className="text-teal-accent" />}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

export function useToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<'default' | 'success'>('success');

  const showToast = (newMessage: string, newVariant: 'default' | 'success' = 'success') => {
    setMessage(newMessage);
    setVariant(newVariant);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    message,
    variant,
    showToast,
    hideToast,
  };
} 