export interface IUser {
  username: string;
  id?: string;
  quizId: string;
  avatar: string;
  status?: "ready" | "waiting";
}
