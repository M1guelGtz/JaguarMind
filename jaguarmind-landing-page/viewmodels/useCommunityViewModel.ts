import { useState, useEffect } from "react";
import type { CommunityUser } from "@/models/community";

const MOCK_USERS: CommunityUser[] = [
  {
    id: "u1",
    username: "NeonHunter",
    status: "online",
    position: { x: 0.15, y: 0.3 },
    connections: ["u2", "u4", "u7"],
  },
  {
    id: "u2",
    username: "CryptoJaguar",
    status: "online",
    position: { x: 0.35, y: 0.15 },
    connections: ["u1", "u3", "u5"],
  },
  {
    id: "u3",
    username: "BlockSmith",
    status: "away",
    position: { x: 0.55, y: 0.35 },
    connections: ["u2", "u6", "u8"],
  },
  {
    id: "u4",
    username: "NodeRunner",
    status: "online",
    position: { x: 0.1, y: 0.65 },
    connections: ["u1", "u5", "u9"],
  },
  {
    id: "u5",
    username: "HashWolf",
    status: "offline",
    position: { x: 0.3, y: 0.55 },
    connections: ["u2", "u4", "u6"],
  },
  {
    id: "u6",
    username: "ChainViper",
    status: "online",
    position: { x: 0.65, y: 0.6 },
    connections: ["u3", "u5", "u10"],
  },
  {
    id: "u7",
    username: "PixelMiner",
    status: "online",
    position: { x: 0.8, y: 0.2 },
    connections: ["u1", "u8"],
  },
  {
    id: "u8",
    username: "DataProwl",
    status: "away",
    position: { x: 0.75, y: 0.5 },
    connections: ["u3", "u7", "u10"],
  },
  {
    id: "u9",
    username: "QuantumFox",
    status: "online",
    position: { x: 0.2, y: 0.85 },
    connections: ["u4", "u10"],
  },
  {
    id: "u10",
    username: "SynthPanther",
    status: "online",
    position: { x: 0.6, y: 0.85 },
    connections: ["u6", "u8", "u9"],
  },
];

export function useCommunityViewModel() {
  const [users, setUsers] = useState<CommunityUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch — swap with WebSocket in the future
    setUsers(MOCK_USERS);
    setIsLoading(false);
  }, []);

  const totalOnline = users.filter((u) => u.status === "online").length;

  return { users, isLoading, totalOnline };
}
