import { type PollTabsProps } from '@/types/poll';

const PollTabs = ({ polls, activePollId, onSelectPoll }: PollTabsProps) => {
  return (
    <div className='flex gap-2'>
      {polls.map((poll) => {
        const isActive = poll.id === activePollId;

        return (
          <button key={poll.id} type='button' role='tab' aria-selected={isActive} onClick={() => onSelectPoll(poll.id)}
            className={`rounded-md px-3 py-2 text-lg font-bold ${isActive
              ? 'bg-accent-two text-background'
              : 'bg-accent-three/80 text-text-primary'
              }`}>
            {poll.question}
          </button>
        );
      })}
    </div>
  );
}

export default PollTabs;