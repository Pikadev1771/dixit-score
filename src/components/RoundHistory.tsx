'use client';

import { Round, Player } from '@/types/types';
import { History, Target, Clock, Mic, Rabbit } from 'lucide-react';
import { getPlayerColor } from '@/constants/theme';
import { formatTimestamp } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useState, useEffect } from 'react';

interface RoundHistoryProps {
  rounds: Round[];
  players: Player[];
}

export const RoundHistory = ({ rounds, players }: RoundHistoryProps) => {
  const lastRoundId = rounds.length > 0 ? rounds[0].id : undefined;
  const [openRound, setOpenRound] = useState<string | undefined>(lastRoundId);

  useEffect(() => {
    if (lastRoundId) {
      setOpenRound(lastRoundId);
    }
  }, [lastRoundId]);

  if (rounds.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="font-light text-xl text-gray-800 mb-4 flex items-center gap-2">
        <History size={20} strokeWidth={1.5} />
        Round History
      </h2>
      <div className="bg-white border-1 border-gray-600 p-6">
        <Accordion
          type="single"
          collapsible
          value={openRound}
          onValueChange={setOpenRound}
        >
          {rounds.map((round) => (
            <AccordionItem key={round.id} value={round.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1 w-full pr-4">
                  <div className="flex items-center gap-2">
                    <Target size={16} strokeWidth={1.5} />
                    <span className="font-medium text-gray-800">
                      Round {round.roundNumber}
                    </span>
                  </div>
                  <span className="flex-1 text-sm text-gray-500 flex items-center gap-1">
                    <Clock size={16} strokeWidth={1.5} />
                    {formatTimestamp(round.timestamp)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-gray-600 pt-2">
                  <p className="font-bold mb-2 flex items-center gap-2 border border-orange-600 text-orange-600 p-2">
                    <Mic size={16} strokeWidth={1.5} />
                    Storyteller:{' '}
                    <span className="text-orange-600">
                      {
                        players.find((p) => p.id === round.form.storytellerId)
                          ?.name
                      }
                    </span>
                  </p>
                  <div className="mt-2 space-y-1">
                    {Object.entries(round.scores)
                      .filter(([, score]) => score > 0)
                      .map(([playerId, score]) => {
                        const playerIndex = players.findIndex(
                          (p) => p.id === playerId
                        );

                        return (
                          <p key={playerId} className="flex items-center gap-2">
                            <Rabbit
                              size={16}
                              color={getPlayerColor(playerIndex)}
                              strokeWidth={1.5}
                            />
                            {players.find((p) => p.id === playerId)?.name}:
                            <span className="font-semibold">+{score}</span>
                          </p>
                        );
                      })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
