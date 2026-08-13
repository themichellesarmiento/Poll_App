import { useState } from 'react';
import { type PollData } from '@/types/poll';

const usePollsState = (initialPolls: PollData[]) => {
  const startingPolls = initialPolls.map((poll) => (
    {
      ...poll,
      votedOptionId: null as string | null,
    }));

  const [polls, setPolls] = useState(startingPolls);

  const castVote = (pollId: string, optionId: string) => {
    setPolls((currentPolls) =>
      currentPolls.map((poll) => {
        if (poll.id !== pollId) return poll;

        return {
          ...poll,
          votedOptionId: optionId,
          options: poll.options.map((option) =>
            option.id === optionId
              ? { ...option, votes: option.votes + 1 }
              : option
          ),
        };
      })
    );
  };

  const changeVote = (pollId: string, newOptionId: string) => {
    setPolls((currentPolls) =>
      currentPolls.map((poll) => {
        if (poll.id !== pollId) return poll;
        if (poll.votedOptionId === newOptionId) return poll;

        return {
          ...poll,
          votedOptionId: newOptionId,
          options: poll.options.map((option) => {
            if (option.id === poll.votedOptionId) {
              return { ...option, votes: option.votes - 1 };
            }
            if (option.id === newOptionId) {
              return { ...option, votes: option.votes + 1 };
            }
            return option;
          }),
        };
      })
    );
  };

  return { polls, castVote, changeVote };
}

export default usePollsState;