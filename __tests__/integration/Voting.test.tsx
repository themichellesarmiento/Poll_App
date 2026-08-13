import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import PollsApp from '@/components/PollsApp';
import { type PollData } from '@/types/poll';

/** Integration test covering: PollTabs + Poll working together as a
 * single voting flow 

 * State change under test: casting a vote moves the poll from
 * 'not voted' (no results shown) to 'voted' (results visible,
 * percentages recalculated from the updated vote counts).

 * Mock poll: Thor 42, Scarlet 51, Captain Marvel 7 -> total 100.
 * Voting for Thor makes it 43 out of 101 -> 43%.
 **/

const mockPolls: PollData[] = [
  {
    id: 'poll-1',
    question: 'Who is the strongest Avenger?',
    options: [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 42 },
      { id: 'option-2', name: 'Scarlet Witch', image: 'scarlet_witch.png', votes: 51 },
      { id: 'option-3', name: 'Captain Marvel', image: 'captain_marvel.png', votes: 7 },
    ],
  },
];

describe('Voting flow', () => {
  it('reveals results with recalculated percentages after a vote is given', () => {
    render(<PollsApp initialPolls={mockPolls} />);

    expect(screen.queryByTestId('results-bar')).not.toBeInTheDocument();
    expect(screen.getByText(/you have not voted yet/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /vote for thor/i }));

    // AFTER voting: results appear, status reflects the vote
    expect(screen.getByTestId('results-bar')).toBeInTheDocument();
    expect(screen.getByText(/you voted for/i)).toHaveTextContent('Thor');

    const thorMeter = screen.getByRole('meter', { name: 'Thor vote percentage', });
    expect(thorMeter).toHaveAttribute('aria-valuenow', '43');
  });

  it('keeps all displayed percentages summing to approximately 100% after a vote', () => {
    render(<PollsApp initialPolls={mockPolls} />);

    fireEvent.click(screen.getByRole('button', { name: /vote for captain marvel/i }));

    const meters = screen.getAllByRole('meter');

    const totalPercentage = meters.reduce((sum, meter) => sum + Number(meter.getAttribute('aria-valuenow')), 0);

    expect(totalPercentage).toBeGreaterThanOrEqual(99);
    expect(totalPercentage).toBeLessThanOrEqual(101);
  });
});