import { database } from "../../root/database";

export const clearOperations = () => {
  const iAmSure = confirm(
    "Are you sure you want to remove all saved operations?",
  );

  if (iAmSure === true) {
    database.ref("operations").set(null);
  }
};
