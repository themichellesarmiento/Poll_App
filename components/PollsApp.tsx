'use client';

import { useState } from 'react';
import { type PollData } from '@/types/poll';
import usePollsState from '@/lib/usePollState';
import PollTabs from '@/components/PollTabs';
import Poll from '@/components/Poll';

interface PollsAppProps {
  initialPolls: PollData[];
}

const PollsApp = ({ initialPolls }: PollsAppProps) => {
  const { polls, castVote, changeVote } = usePollsState(initialPolls);
  const [activePollId, setActivePollId] = useState(initialPolls[0].id);
  const activePoll = polls.find((poll) => poll.id === activePollId)!;

  return (
    <main className='mx-auto flex w-full flex-col gap-6 p-8'>
      <h1 className='text-2xl font-extrabold text-center'>Marvel Polls</h1>
      <PollTabs polls={polls} activePollId={activePollId} onSelectPoll={setActivePollId} />
      <Poll
        pollData={activePoll}
        votedOptionId={activePoll.votedOptionId}
        onVote={(optionId) => castVote(activePollId, optionId)}
        onChangeVote={(newOptionId) => changeVote(activePollId, newOptionId)}
      />
    </main>
  );
};

export default PollsApp;