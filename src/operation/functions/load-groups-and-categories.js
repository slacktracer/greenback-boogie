import { database } from "../../root/database";

export const loadGroupsAndCategories = ({ groupsAndCategories }) => {
  const groupsAndCategoriesRef = database.ref("groupsAndCategories");

  groupsAndCategoriesRef.on("value", (snapshot) => {
    const data = snapshot.val();

    groupsAndCategories.value = data;
  });
};
