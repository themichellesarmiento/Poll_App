import {type ResultsProps } from '@/types/poll';

const Results = ({ percentages, winningOptionIds }: ResultsProps) => {
  return (
    <ul data-testid='results-bar' className='mt-4 flex flex-col gap-2'>
      {percentages.map((option) => {
        const isLeading = winningOptionIds.includes(option.id);

        return (
          <li key={option.id}>
            <div className='mb-1 flex justify-between text-sm md:text-base'>
              <span className={isLeading ? 'font-bold' : ''}>
                {option.name} {isLeading && '🦸'}
              </span>
              <span>{option.percentage}%</span>
            </div>
            <div role='meter' aria-label={`${option.name} vote percentage`} aria-valuenow={option.percentage} aria-valuemin={0} aria-valuemax={100} className='h-3 w-full rounded-full bg-accent-one/40'>
              <div
                className={`h-3 rounded-full ${isLeading ? 'bg-accent-two' : 'bg-accent-one/40'}`}
                style={{ width: `${option.percentage}%` }}/>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Results;