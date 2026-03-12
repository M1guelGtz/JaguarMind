import { useState, useEffect } from "react";
import type { TeamMember } from "@/models/team";

const TEAM_DATA: TeamMember[] = [
  {
    id: "richard",
    name: "Richard Othon Castañeda de la Rosa",
    alias: "Richie",
    age: 20,
    role: "FullStack",
    githubUrl: "https://github.com/RichieCast07",
    linkedinUrl:
      "https://www.linkedin.com/in/richard-othon-casta%C3%B1eda-de-la-rosa-809b182a1",
    email: "sploit07@email.com",
    avatar: "/richard.jpeg",
  },
  {
    id: "miguel",
    name: "Miguel Angel Gutierrez Gomez",
    alias: "MikeTrike",
    age: 21,
    role: "FullStack",
    githubUrl: "https://github.com/M1guelGtz",
    linkedinUrl: "https://www.linkedin.com/in/m1guelgtz/",
    email: "M.angelgutierrezgz@gmail.com",
    avatar: "/mike_trike.jpeg",
  },
  {
    id: "moises",
    name: "Ing Moises Franco Gutierrez",
    alias: "Moi",
    age: 21,
    role: "FullStack",
    githubUrl: "https://github.com/MoisesFrancoG",
    linkedinUrl:
      "https://www.linkedin.com/in/moises-franco-guti%C3%A9rrez-7a3874291/",
    email: "moisesfrancogtz@gmail.com",
    avatar: "/moises.jpeg", 
  },
  {
    id: "chuy",
    name: "Jesús Imanol Castillo Avendaño",
    alias: "Chuy",
    age: 20,
    role: "FullStack",
    githubUrl: "https://github.com/jesus-imanol",
    linkedinUrl:
      "https://www.linkedin.com/in/jes%C3%BAs-imanol-castillo-132974201/",
    email: "jesusimanolcastillo@gmail.com",
    avatar: "/chuy.jpeg",
  },
   {
    id: "migue",
    name: "Miguel Angel Gutierrez Gomez",
    alias: "Shifu",
    age: 21,
    role: "FullStack",
    githubUrl: "https://github.com/MoisesFrancoG",
    linkedinUrl:
      "https://www.linkedin.com/in/moises-franco-guti%C3%A9rrez-7a3874291/",
    email: "moisesfrancogtz@gmail.com",
    avatar: "/migue.jpeg", 
  },
];

export function useTeamViewModel() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch — swap with API call in the future
    setMembers(TEAM_DATA);
    setIsLoading(false);
  }, []);

  return { members, isLoading };
}
