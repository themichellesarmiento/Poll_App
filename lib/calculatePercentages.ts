import { PollOption, OptionPercentage } from "@/types/poll";

export function calculatePercentages(options: PollOption[]): OptionPercentage[] {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return options.map((option) => ({
    id: option.id,
    name: option.name,
    percentage: totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100),
  }));
}