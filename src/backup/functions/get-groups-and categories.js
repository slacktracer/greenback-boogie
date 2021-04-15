import { fixName } from "../helpers/fix-names";

export const getGroupsAndCategories = ({ expensesAndIncomeData }) => {
  const groupsAndCategories = expensesAndIncomeData
    .reduce((reduction, operation) => {
      let [, , , group, category] = operation;

      category = fixName({ name: category, type: "category" });
      group = fixName({ name: group, type: "group" });

      const existingGroupObject = reduction.find(
        (groupObject) => groupObject.name === group,
      );

      if (existingGroupObject) {
        existingGroupObject.categories.add(category);
      } else {
        const newGroupObject = { categories: new Set([category]), name: group };

        reduction.push(newGroupObject);
      }

      return reduction;
    }, [])
    .sort((groupA, groupB) => groupA.name.localeCompare(groupB.name))
    .map((group) => {
      group.categories = Array.from(
        group.categories,
      ).sort((categoryA, categoryB) => categoryA.localeCompare(categoryB));

      return group;
    })
    .reduce((reduction, group) => {
      reduction[group.name] = group.categories;

      return reduction;
    }, {});

  return groupsAndCategories;
};
