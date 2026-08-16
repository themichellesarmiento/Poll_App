import { render, screen, fireEvent } from '@testing-library/react';
import Poll from '@/components/Poll';
import { PollData } from '@/types/poll';

const pollData: PollData = {
  id: 'poll-1',
  question: 'Who is the strongest Avenger?',
  options: [
    { id: 'opt-1', name: 'Thor', image: 'thor.png', votes: 42 },
    { id: 'opt-2', name: 'Hulk', image: 'hulk.png', votes: 51 },
    { id: 'opt-3', name: 'Captain Marvel', image: 'cm.png', votes: 7 },
  ],
};

describe('Poll', () => {
  it('renders the poll question as a heading', () => {
    render(
      <Poll pollData={pollData} votedOptionId={null} onVote={jest.fn()} onChangeVote={jest.fn()} />
    );

    expect(screen.getByRole('heading', { name: /strongest avenger/i })).toBeInTheDocument();
  });

  it("renders every option's vote button", () => {
    render(
      <Poll pollData={pollData} votedOptionId={null} onVote={jest.fn()} onChangeVote={jest.fn()} />
    );

    expect(screen.getAllByRole('button', { name: /vote for/i })).toHaveLength(3);
  });

  it('does not render the results bar before the user has voted', () => {
    render(
      <Poll pollData={pollData} votedOptionId={null} onVote={jest.fn()} onChangeVote={jest.fn()} />
    );

    expect(screen.queryByTestId('results-bar')).not.toBeInTheDocument();
  });
});