export interface PollOption {
  id: string;
  name: string;
  image: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
}

export interface OptionPercentage {
  id: string;
  name: string;
  percentage: number;
}

export interface ResultsProps {
  percentages: OptionPercentage[];
  winningOptionIds: string[];
}

export interface PollTabsProps {
  polls: PollData[];
  activePollId: string;
  onSelectPoll: (pollId: string) => void;
}

export interface PollProps {
  pollData: PollData;
  votedOptionId: string | null;
  onVote: (optionId: string) => void;
  onChangeVote: (newOptionId: string) => void;
}