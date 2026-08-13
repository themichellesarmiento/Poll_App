import { calculatePercentages } from '@/lib/calculatePercentages';
import { type PollOption } from '@/types/poll';

describe('Calculate percentages', () => {
  it('returns 0% for every option when total votes is 0', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 0 },
      { id: 'option-2', name: 'Loki', image: 'loki.png', votes: 0 },
    ];

    const result = calculatePercentages(options);

    expect(result).toEqual([
      { id: 'option-1', name: 'Thor', percentage: 0 },
      { id: 'option-2', name: 'Loki', percentage: 0 },
    ]);
  });

  it('calculates the correct percentage for a simple two options case', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 25 },
      { id: 'option-2', name: 'Loki', image: 'loki.png', votes: 75 },
    ];

    const result = calculatePercentages(options);

    expect(result.find((option) => option.id === 'option-1')?.percentage).toBe(25);
    expect(result.find((option) => option.id === 'option-2')?.percentage).toBe(75);
  });

  it('rounds percentages to the nearest whole number', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 1 },
      { id: 'option-2', name: 'Loki', image: 'loki.png', votes: 2 },
    ];

    const result = calculatePercentages(options);

    expect(result.find((option) => option.id === 'option-1')?.percentage).toBe(33); // 1/ 3 = 33.33
    expect(result.find((option) => option.id === 'option-2')?.percentage).toBe(67);  //2/3 = 66.66
  });

  it('recalculates a higher percentage after an option receives an additional vote', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 30 }, //percentage: 28
      { id: 'option-2', name: 'Loki', image: 'loki.png', votes: 75 }, // p: 71
    ];

    const before = calculatePercentages(options);

    const updatedOptions = options.map((option) =>
      option.id === 'option-2' ? { ...option, votes: option.votes + 1 } : option
    );
    const after = calculatePercentages(updatedOptions);

    const lokiBefore = before.find((option) => option.id === 'option-2')!.percentage;
    const lokiAfter = after.find((option) => option.id === 'option-2')!.percentage;

    expect(lokiAfter).toBeGreaterThan(lokiBefore);
  });
});