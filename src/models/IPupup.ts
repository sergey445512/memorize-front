export default interface IPopup {
  text: string;
  buttonText: string;
  function: "deleteAll" | "deleteCompleted" | "";
  userId: string;
}
