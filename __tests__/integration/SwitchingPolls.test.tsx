import { render, screen, fireEvent } from '@testing-library/react';
import PollsApp from '@/components/PollsApp';
import { type PollData } from '@/types/poll';

/** Integration test covering: PollTabs + Poll working together across
 * multiple polls.
 
 * State change under test: voting on one poll must not affect another
 * poll's vote state. Switching tabs and switching back must preserve
 * each poll's own, independent voting status.
 **/

const mockPolls: PollData[] = [
  {
    id: 'poll-1',
    question: 'Who is the strongest Avenger?',
    options: [
      { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 42 },
      { id: 'option-2', name: 'Scarlet Witch', image: 'scarlet_witch.png', votes: 51 },
    ],
  },
  {
    id: 'poll-2',
    question: 'Best villain?',
    options: [
      { id: 'option-4', name: 'Thanos', image: 'thanos.png', votes: 88 },
      { id: 'option-5', name: 'Loki', image: 'loki.png', votes: 64 },
    ],
  },
];

describe('Switching between polls', () => {
  it("keeps each poll's vote state independent when switching tabs", () => {
    render(<PollsApp initialPolls={mockPolls} />);

    // VOTE on poll 1 
    fireEvent.click(screen.getByRole('button', { name: /vote for thor/i }));
    expect(screen.getByText(/you voted for/i)).toHaveTextContent('Thor');

    // SWITCH to poll 2  - should show no vote recorded
    fireEvent.click(screen.getByRole('tab', { name: /best villain/i }));
    expect(screen.getByRole('heading', { name: /best villain/i })).toBeInTheDocument();
    expect(screen.getByText(/you have not voted yet/i)).toBeInTheDocument();
    expect(screen.queryByTestId('results-bar')).not.toBeInTheDocument();

    // SWITCH BACK to poll 1 - previous vote should still be there
    fireEvent.click(screen.getByRole('tab', { name: /strongest avenger/i }));
    expect(screen.getByRole('heading', { name: /strongest avenger/i })).toBeInTheDocument();
    expect(screen.getByText(/you voted for/i)).toHaveTextContent('Thor');
    expect(screen.getByTestId('results-bar')).toBeInTheDocument();
  });
});