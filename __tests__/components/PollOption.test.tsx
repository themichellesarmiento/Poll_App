import { render, screen, fireEvent } from '@testing-library/react';
import PollOption from '@/components/PollOption';
import { PollOption as PollOptionType } from '@/types/poll';

const lokiOption: PollOptionType = {
  id: 'option-1',
  name: 'Loki',
  image: 'loki.png',
  votes: 42,
};

const mockFxn = jest.fn();

describe('Poll option', () => {
  it('renders the option name and image from props', () => {
    render(
      <ul>
        <PollOption option={lokiOption} hasVoted={false} isSelected={false} onVote={mockFxn} />
      </ul>);

    expect(screen.getByText(lokiOption.name)).toBeInTheDocument();

    const loki = screen.getByRole('img')
    expect(loki.getAttribute('src')).toBe(lokiOption.image)
    expect(loki.getAttribute('alt')).toBe(lokiOption.name)

  });

  it('renders a vote button when the option has not been voted for', () => {
    render(
      <ul>
        <PollOption option={lokiOption} hasVoted={false} isSelected={false} onVote={mockFxn} />
      </ul>

    );
    expect(screen.getByRole('button', { name: /vote/i })).not.toBeDisabled();
  });

  it("calls onVote with the option's id when the vote button is clicked", () => {

    const handleVote = jest.fn()

    render(
      <ul>
        <PollOption option={lokiOption} hasVoted={false} isSelected={false} onVote={handleVote} />
      </ul>

    );

    fireEvent.click(screen.getByRole('button', { name: /vote/i }));

    expect(handleVote).toHaveBeenCalledTimes(1);
    expect(handleVote).toHaveBeenCalledWith(lokiOption.id);
  });

  it('disables the vote button once the user has voted', () => {
    render(
      <ul>
        <PollOption option={lokiOption} hasVoted={true} isSelected={false} onVote={mockFxn} />
      </ul>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it("shows 'Voted' as the button label when this option is the selected one", () => {
    render(
      <ul>
        <PollOption option={lokiOption} hasVoted={true} isSelected={true} onVote={mockFxn} />
      </ul>

    );

    expect(screen.getByRole('button', { name: /voted/i })).toBeInTheDocument();
  });
});