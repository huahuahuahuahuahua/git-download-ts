// import { download } from "./git-download.js";
// // const download = require("./src/git-download.ts");

// download(
//   `https://github.com:huahuahuahuahuahua/util-template#main`,
//   "test",
//   { clone: true },
//   async (err) => {
//     if (err) {
//       console.error("克隆项目失败，err:", err);
//       //   throw new Error(err);
//       return;
//     } else {
//       console.log("克隆项目成功");
//       //   cloneFile(targetDir, projectName, projectInfo);
//     }
//   }
// );
let addEsmMiddle = (str) => {
  return str.split(".").join(".esm.");
};
let firstCharUpperCase = (str) => {
  return str
    .split(".")
    .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1))
    .join("");
};
console.log(addEsmMiddle("index.js"));
console.log(firstCharUpperCase("index.js"));
