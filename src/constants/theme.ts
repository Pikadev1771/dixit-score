import { PlayerColors } from '@/types/theme';

export const PLAYER_COLORS: PlayerColors = {
  red: '#ff6b6b',
  yellow: '#ffd23f',
  green: '#4ecdc4',
  blue: '#45b7d1',
  purple: '#a8a4e6',
  pink: '#f7a8b8',
  orange: '#ff6b35',
  gray: '#6b7280',
};

export const getPlayerColor = (playerIndex: number): string => {
  const colorKeys: (keyof PlayerColors)[] = [
    'red',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'orange',
    'gray',
  ];
  const colorKey = colorKeys[playerIndex] || colorKeys[0];
  return PLAYER_COLORS[colorKey];
};
