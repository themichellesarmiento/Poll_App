import { type PollOption } from '@/types/poll';

interface VoteStatusProps {
  hasVoted: boolean;
  votedOptionId: string | null;
  votedOptionName: string | null;
  options: PollOption[];
  onChangeVote: (newOptionId: string) => void;
}

const VoteStatus = ({ hasVoted, votedOptionId, votedOptionName, options, onChangeVote }: VoteStatusProps) => {
  if (!hasVoted) {
    return (
      <p className='text-base text-accent-three'>You have not voted yet</p>
    );
  }

  return (
    <div className='flex items-center justify-between text-sm md:text-base'>
      <p className='text-text-primary'>
        You voted for <span className='font-semibold'>{votedOptionName}</span>
      </p>

      <label className='flex items-center gap-2'>
        <span className='text-text-primary/80'>Change vote:</span>
        <select data-testid='change-vote-option' aria-label='Change vote' value={votedOptionId ?? ''}
          onChange={(event) => onChangeVote(event.target.value)}
          className='rounded-md border border-text-primary/80 px-2 py-1'>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default VoteStatus;