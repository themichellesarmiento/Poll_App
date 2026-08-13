import { type PollOption } from '@/types/poll';

interface PollOptionProps {
  option: PollOption;
  hasVoted: boolean;
  isSelected: boolean;
  onVote: (optionId: string) => void;
}
const PollOption = ({ option, hasVoted, isSelected, onVote }: PollOptionProps) => {
  return (
    <li className='flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3'>
      <div className='flex items-center gap-3'>
        <img src={option.image} alt={option.name} className='h-14 md:h-20 w-14 md:w-20 rounded-full object-cover' />
        <span className='font-medium'>{option.name}</span>
      </div>

      <button data-testid = 'vote-button' type='button' onClick={() => onVote(option.id)} disabled={hasVoted} aria-pressed={isSelected}   aria-label={isSelected ? `Voted for ${option.name}` : `Vote for ${option.name}`}
        className='rounded-md bg-accent-two px-3 py-1 text-sm md:text-base font-semibold text-background disabled:cursor-not-allowed disabled:bg-gray-300'>
        {isSelected ? 'Voted' : 'Vote'}
      </button>
    </li>
  );
}

export default PollOption;