import { render, screen, fireEvent } from '@testing-library/react';
import VoteStatus from '@/components/VoteStatus';
import { PollOption } from '@/types/poll';

const options: PollOption[] = [
  { id: 'option-1', name: 'Thor', image: 'thor.png', votes: 43 },
  { id: 'option-2', name: 'Loki', image: 'loki.png', votes: 51 },
];

const mockFxn = jest.fn()

describe('Vote status', () => {
  it("shows 'You haven't voted yet' when hasVoted is false", () => {
    render(
      <VoteStatus hasVoted={false} votedOptionId={null} votedOptionName={null} options={options} onChangeVote={mockFxn} />
    );

    expect(screen.getByText(/you have not voted yet/i)).toBeInTheDocument();
  });

  it('does not render the change vote dropdown before the user has voted', () => {
    render(
      <VoteStatus hasVoted={false} votedOptionId={null} votedOptionName={null} options={options} onChangeVote={mockFxn} />
    );

    expect(screen.queryByTestId('change-vote-option')).not.toBeInTheDocument();
  });

  it("shows the voted option's name once a vote has been recorded", () => {
    render(
      <VoteStatus hasVoted={true} votedOptionId='option-2' votedOptionName='Loki' options={options} onChangeVote={mockFxn}
      />
    );
    expect(screen.getByText(/you voted for/i)).toHaveTextContent('Loki');
  });

  it('calls onChangeVote with the newly selected option id when the dropdown changes', () => {
    const handleChangeVote = jest.fn();

    render(
      <VoteStatus hasVoted={true} votedOptionId='option-2' votedOptionName='Loki' options={options} onChangeVote={handleChangeVote} />
    );

    const dropdown = screen.getByTestId('change-vote-option')
    fireEvent.change(dropdown, { target: { value: options[1].id } });

    expect(handleChangeVote).toHaveBeenCalledWith(options[1].id);
  });

  it('lists every poll option in the change vote dropdown', () => {
    render(
      <VoteStatus hasVoted={true} votedOptionId='option-2' votedOptionName='Loki' options={options} onChangeVote={mockFxn} />
    );

    expect(screen.getAllByRole('option')).toHaveLength(2);
  });
});