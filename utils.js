import _ from "lodash";
import path from "path";
import { formatOutput } from "./format-output.js";

export const diff = (initial, performed, format) => {
  const allKeys = _.union(_.keys(initial), _.keys(performed)).sort();
  let result = "{\n";
  allKeys.forEach((key) => {
    if (!_.isEqual(initial[key], performed[key])) {
      if (initial[key] !== undefined) {
        result += formatOutput("removed", format, key, initial[key]);
      }
      if (performed[key] !== undefined) {
        result += formatOutput("added", format, key, performed[key]);
      }
    } else {
      result += formatOutput("initial", format, key, initial[key]);
    }
  });
  result += "}";
  return result;
};

export const getType = (filePath) => {
  const type = path.extname(filePath);
  return type ? type.slice(1) : type;
};
