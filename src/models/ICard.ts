export default interface ICard {
  word?: string;
  description?: string;
  context?: string;
  _id?: string;
  isCompleted?: boolean;
  className?: string;
  image?: string;
  type?: "home" | "slider" | "default";
  slaider?: boolean;
}
