'use client';

import { useIndiaTime } from '@/lib/hooks';

/**
 * Tiny client component that just renders the current IST time.
 * Isolated so that PageWrapper itself can remain a server component.
 */
export default function TimeDisplay() {
  const time = useIndiaTime();
  return <span>{time || '\u00A0'}</span>;
}
