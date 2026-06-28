import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import { useCallback, useState } from "react";
import type { Votes, VoteType } from "../../types/votes.ts";
import VoteOptions from "../VoteOptions/VoteOptions.tsx";
import VoteStats from "../VoteStats/VoteStats.tsx";
import Notification from "../Notification/Notification.tsx";

const DEFAULT_VOTES = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [votes, setVotes] = useState<Votes>(DEFAULT_VOTES);
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;
  const isVoted = totalVotes > 0;

  const handleVote = useCallback(
    (type: VoteType) => {
      setVotes({
        ...votes,
        [type]: votes[type] + 1,
      });
    },
    [votes],
  );

  const resetVotes = useCallback(() => {
    setVotes(DEFAULT_VOTES);
  }, []);

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {isVoted && (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      )}
      {!isVoted && <Notification />}
    </div>
  );
}

export default App;
