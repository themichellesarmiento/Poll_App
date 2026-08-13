import { getWinningOption } from '@/lib/getWinningOption';
import { PollOption } from '@/types/poll';

describe('Get winning option', () => {
  it('returns the single option with the highest vote count', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: '/thor.png', votes: 42 },
      { id: 'option-2', name: 'Hulk', image: '/hulk.png', votes: 51 },
      { id: 'option-3', name: 'Captain Marvel', image: '/cm.png', votes: 37 },
    ];

    const result = getWinningOption(options);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('option-2');
  });

  it('returns every tied option when there is a tie for the highest votes', () => {
    const options: PollOption[] = [
      { id: 'option-7', name: 'Tom Holland', image: '/th.png', votes: 55 },
      { id: 'option-8', name: 'Tobey Maguire', image: '/tm.png', votes: 55 },
      { id: 'option-9', name: 'Andrew Garfield', image: '/ag.png', votes: 40 },
    ];

    const result = getWinningOption(options);
    const resultIds = result.map((option) => option.id);

    expect(result).toHaveLength(2);
    expect(resultIds).toEqual(expect.arrayContaining(['option-7', 'option-8']));
  });

  it('returns an empty array when every option has 0 votes', () => {
    const options: PollOption[] = [
      { id: 'option-1', name: 'Thor', image: '/thor.png', votes: 0 },
      { id: 'option-2', name: 'Hulk', image: '/hulk.png', votes: 0 },
    ];

    const result = getWinningOption(options);
    expect(result).toEqual([]);
  });
});