import { render, screen, fireEvent } from '@testing-library/react';
import PollTabs from '@/components/PollTabs';
import { type PollData, type PollTabsProps } from '@/types/poll';

const polls: PollData[] = [
  { id: 'poll-1', question: 'Who is the strongest Avenger?', options: [] },
  { id: 'poll-2', question: 'Best villain?', options: [] },
  { id: 'poll-3', question: 'Favorite Spider Man actor?', options: [] },
];

const mockFxn = jest.fn();

const pollTabs: PollTabsProps = {
  polls: polls,
  activePollId: polls[1].id,
  onSelectPoll: mockFxn
}

describe('Poll tabs', () => {
  it('renders one tab per poll', () => {
    render(
      <PollTabs {...pollTabs} />
    );

    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it("renders each poll's question as a tab", () => {
    render(
      <PollTabs {...pollTabs} />
    );

    const tabs = screen.getAllByRole('tab');
    const tabNames = tabs.map((tab) => tab.textContent);

    pollTabs.polls.map((poll) => {
      expect(tabNames).toContain(poll.question);
    });
  });

  it("marks the active poll's tab as selected", () => {
    render(
      <PollTabs {...pollTabs} />
    );

    expect(screen.getByRole('tab', { name: /best villain/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: /strongest avenger/i })).toHaveAttribute('aria-selected', 'false');
  });

  it("calls onSelectPoll with the clicked poll's id", () => {
    const handleSelectPoll = jest.fn();

    render(
      <PollTabs polls={polls} activePollId='poll-1' onSelectPoll={handleSelectPoll} />
    );

    const clickedPoll = screen.getByRole('tab', { name: /best villain/i })
    fireEvent.click(clickedPoll);

    expect(handleSelectPoll).toHaveBeenCalledWith(pollTabs.activePollId);
  });
});