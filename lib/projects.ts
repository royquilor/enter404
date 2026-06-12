export interface Project {
  name: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    name: "Minepath",
    description:
      "AI agreed with every idea. Minepath shows you if anyone's actually searching for it.",
    url: "https://minepath.app",
  },
  {
    name: "Lorei",
    description:
      "One session a week. Seven posts, three articles — in your voice, without the context switch.",
    url: "https://lorei.app",
  },
];
