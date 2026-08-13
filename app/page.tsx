import { pollQuestions } from '@/data/polls';
import PollsApp from '@/components/PollsApp';

const Home = () => {
  return (
    <PollsApp initialPolls={pollQuestions} />
  );
};

export default Home;