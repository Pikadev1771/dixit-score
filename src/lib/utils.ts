import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (timestamp: string) => {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return timestamp;
  }
};
