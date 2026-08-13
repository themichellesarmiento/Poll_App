import { PollOption } from "@/types/poll";

/** NOTE (test): 
 * RETURNS the option(s) with the highest vote count.
 * RETURNS multiple options if there is a tie.
 * RETURNS an empty array if every option has 0 votes.
 */

export function getWinningOption(options: PollOption[]): PollOption[] {
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  if (totalVotes === 0) {
    return [];
  }

  const highestVoteCount = Math.max(...options.map((option) => option.votes));
  return options.filter((option) => option.votes === highestVoteCount);
}