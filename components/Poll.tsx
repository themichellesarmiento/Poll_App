import { type PollProps } from '@/types/poll';
import { calculatePercentages } from '@/lib/calculatePercentages';
import { getWinningOption } from '@/lib/getWinningOption';
import PollOption from '@/components/PollOption';
import Results from '@/components/Results';
import VoteStatus from '@/components/VoteStatus';

const Poll = ({ pollData, votedOptionId, onVote, onChangeVote }: PollProps) => {
  const hasVoted = votedOptionId !== null;
  const votedOption = pollData.options.find((option) => option.id === votedOptionId);

  const percentages = calculatePercentages(pollData.options);
  const winningOptions = getWinningOption(pollData.options);
  const winningOptionIds = winningOptions.map((option) => option.id);

  return (
    <section className='flex flex-col gap-4'>
      <h2 className='text-lg font-bold'>{pollData.question}</h2>
      <ul className='flex flex-col gap-2'>
        {pollData.options.map((option) => (
          <PollOption key={option.id} option={option} hasVoted={hasVoted} isSelected={option.id === votedOptionId} onVote={onVote} />
        ))}
      </ul>

      <VoteStatus hasVoted={hasVoted} votedOptionId={votedOptionId} votedOptionName={votedOption?.name ?? null} options={pollData.options} onChangeVote={onChangeVote} />

      {hasVoted && (
        <Results percentages={percentages} winningOptionIds={winningOptionIds} />
      )}
    </section>
  );
};

export default Poll;