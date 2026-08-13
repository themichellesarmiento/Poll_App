import { render, screen, within, fireEvent } from '@testing-library/react';
import PollsApp from '@/components/PollsApp';
import { type PollData } from '@/types/poll';

/**Integration test covering: PollTabs + Poll working together when a
 * user changes their mind after already voting.
 
 * State change under test: switching a vote from one option to another
 * removes the vote from the old option and adds it to the new one,
 * which recalculates percentages and can move the 'leading/super hero' icon.
 
 * Mock Poll ('Best Spider Man actor?') starts tied:
 * Tobey Maguire 55, Andrew Garfield 40, Tom Holland 55 -> total 150.
 * Voting for Tobey breaks the tie in his favour (56 vs 55).
 * Changing that vote to Tom Holland flips the lead to him instead
 * (Tobey back to 55, Tom up to 56) without changing the total (151).
 **/

const mockPolls: PollData[] = [
  {
    id: 'poll-2',
    question: 'Best Spider Man actor?',
    options: [
      { id: 'option-4', name: 'Tobey Maguire', image: 'tobey_maguire.png', votes: 55 },
      { id: 'option-5', name: 'Andrew Garfield', image: 'andrew_garfield.png', votes: 40 },
      { id: 'option-6', name: 'Tom Holland', image: 'tom_holland.png', votes: 55 },
    ],
  },
];

describe('Changing an existing vote', () => {
  it('moves the hero icon and recalculates percentages when the vote changes', () => {
    render(<PollsApp initialPolls={mockPolls} />);

    // VOTE for Tobey Maguire, breaking the initial tie in his favour
    fireEvent.click(screen.getByRole('button', { name: /vote for tobey maguire/i }));

    const resultsBar = screen.getByTestId('results-bar');
    expect(within(resultsBar).getByText(/tobey maguire/i)).toHaveTextContent('🦸');
    expect(within(resultsBar).getByText(/tom holland/i)).not.toHaveTextContent('🦸');

    // CHANGE the vote to Tom Holland
    const changeDropdown = screen.getByTestId('change-vote-option');
    fireEvent.change(changeDropdown, { target: { value: 'option-6' } });

    expect(screen.getByText(/you voted for/i)).toHaveTextContent('Tom Holland');
    expect(within(resultsBar).getByText(/tom holland/i)).toHaveTextContent('🦸');
    expect(within(resultsBar).getByText(/tobey maguire/i)).not.toHaveTextContent('🦸');

    const tomMeter = within(resultsBar).getByRole('meter', { name: 'Tom Holland vote percentage', });
    expect(tomMeter).toHaveAttribute('aria-valuenow', '37');
  });
});