import downloadUrl from "download";
import gitclone from "git-clone";
import { sync as rm } from "rimraf";
/**
 * @msg:
 * @param {string} repo
 * @param {string} dest
 * @param {object} opts
 * @param {TAnyFunction} fn
 * @Descripttion:
 */
export interface INalmalize {
  type: string;
  origin: string;
  owner: string;
  name: string;
  checkout: string;
  url: string;
}
export interface IOpts {
  clone?: boolean;
  headers?: object;
}
export type TAnyFunction = (...args: any[]) => void;
/**
 * @msg:
 * @param {string} repo
 * @param {string} dest
 * @param {IOpts} opts
 * @param {TAnyFunction} fn
 * @return {void}
 * @Descripttion:
 */
export function download(
  repo: string,
  dest: string,
  opts: IOpts,
  fn: TAnyFunction
): void {
  const clone = opts.clone || false;
  delete opts.clone;
  const repocopy: INalmalize = normalize(repo);
  const url = getUrl(repocopy, clone) || repocopy.url;
  if (clone) {
    const cloneOptions = {
      checkout: repocopy.checkout,
      shallow: repocopy.checkout === "master",
      ...opts,
    };
    console.log("cloneOptions", cloneOptions);
    console.log("gitclone", "url" + url, "dest" + dest);
    console.log(cloneOptions);
    gitclone(url, dest, cloneOptions, function (err?: Error | undefined) {
      if (err === undefined) {
        rm(dest + "/.git");
        fn();
      } else {
        fn(err);
      }
    });
  } else {
    const downloadOptions = {
      extract: true,
      strip: 1,
      mode: "666",
      ...opts,
      headers: {
        accept: "application/zip",
        ...(opts.headers || {}),
      },
    };
    downloadUrl(url, dest, downloadOptions)
      .then(function data() {
        fn();
      })
      .catch((err: Error) => {
        fn(err);
      });
  }
}
/**
 * @msg:
 * @param {string} repo
 * @return {*}
 * @Descripttion:
 */
export function normalize(repo: string): INalmalize {
  let regex = /^(?:(direct):([^#+])(?:#(.+))?)$/;
  let match: RegExpExecArray | null = regex.exec(repo);
  if (!!match) {
    const url: string = match[2];
    const directCheckout = match[3] || "master";
    return {
      type: "direct",
      origin: url,
      owner: "",
      name: "",
      checkout: directCheckout,
      url: "",
    };
  } else {
    regex =
      /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
    match = regex.exec(repo);
    if (!!match) {
      const type: string = match[1] || "github";
      let origin: string = match[2] || "";
      const owner: string = match[3];
      const name: string = match[4];
      const checkout: string = match[5] || "master";
      if (origin === null) {
        if (type === "github") {
          origin = "github.com";
        } else if (type === "gitlab") {
          origin = "gitlab.com";
        } else if (type === "bitbucket") {
          origin = "bitbucket.org";
        }
      }
      return {
        type: type,
        origin: origin,
        owner: owner,
        name: name,
        checkout: checkout,
        url: "",
      };
    }
  }
  return {
    type: "",
    origin: "",
    owner: "",
    name: "",
    checkout: "",
    url: "",
  };
}

/**
 * @msg:
 * @param {string} origin
 * @param {boolean} clone
 * @return {*}
 * @Descripttion:
 */
export function addProtocal(origin: string, clone: boolean): string {
  if (!/^(f|ht)tps?:\/\//i.test(origin)) {
    if (clone) {
      origin = "git@" + origin;
    } else {
      origin = "https://" + origin;
    }
  }
  return origin;
}

/**
 * @msg:
 * @param {INalmalize} repo
 * @param {string} clone
 * @return {*}
 * @Descripttion:
 */
export function getUrl(repo: INalmalize, clone: boolean): string {
  let url = "";
  let origin: string = addProtocal(repo.origin, clone);
  if (/^git@/i.test(origin)) {
    origin = origin + ":";
  } else {
    origin = origin + "/";
  }
  if (!!clone) {
    url = origin + repo.owner + "/" + repo.name + ".git";
  } else {
    if (repo.type === "github") {
      url =
        origin +
        repo.owner +
        "/" +
        repo.name +
        "/archive/" +
        repo.checkout +
        ".zip";
    } else if (repo.type === "gitlab") {
      url =
        origin +
        repo.owner +
        "/" +
        repo.name +
        "/repository/archive.zip?ref=" +
        repo.checkout;
    } else if (repo.type === "bitbucket") {
      url =
        origin +
        repo.owner +
        "/" +
        repo.name +
        "/get/" +
        repo.checkout +
        ".zip";
    }
  }
  return url;
}

export default download;
