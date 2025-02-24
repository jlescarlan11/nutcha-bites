import { useState } from "react";

export default function useVote() {
  const [userVote, setUserVote] = useState(null);
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  const handleUpVote = () => {
    if (userVote === "up") return;
    if (userVote === "down") {
      setDownCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
    setUpCount((prev) => prev + 1);
    setUserVote("up");
  };

  const handleDownVote = () => {
    if (userVote === "down") return;
    if (userVote === "up") {
      setUpCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
    setDownCount((prev) => prev + 1);
    setUserVote("down");
  };

  return { userVote, upCount, downCount, handleUpVote, handleDownVote };
}
