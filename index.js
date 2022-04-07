import { download } from "./git-download.js";
// const download = require("./src/git-download.ts");

download(
  `https://github.com:huahuahuahuahuahua/util-template#main`,
  "test",
  { clone: true },
  async (err) => {
    if (err) {
      console.error("克隆项目失败，err:", err);
      //   throw new Error(err);
      return;
    } else {
      console.log("克隆项目成功");
      //   cloneFile(targetDir, projectName, projectInfo);
    }
  }
);
