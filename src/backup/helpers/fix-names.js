import { nameFixes } from "./name-fixes";

export const fixName = ({ name, type }) => {
  let fixedName = "";

  fixedName = nameFixes[type][name] || name;

  return fixedName;
}
