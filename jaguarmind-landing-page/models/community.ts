export interface CommunityUser {
  id: string;
  username: string;
  status: "online" | "offline" | "away";
  position: { x: number; y: number };
  connections: string[];
}
