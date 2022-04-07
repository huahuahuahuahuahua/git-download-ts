Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.addProtocal = exports.normalize = exports.download = void 0;
var tslib_1 = require("tslib");
var download_1 = tslib_1.__importDefault(require("download"));
var git_clone_1 = tslib_1.__importDefault(require("git-clone"));
var rimraf_1 = require("rimraf");
/**
 * @msg:
 * @param {string} repo
 * @param {string} dest
 * @param {IOpts} opts
 * @param {TAnyFunction} fn
 * @return {void}
 * @Descripttion:
 */
function download(repo, dest, opts, fn) {
    var clone = opts.clone || false;
    delete opts.clone;
    var repocopy = normalize(repo);
    var url = getUrl(repocopy, clone) || repocopy.url;
    if (clone) {
        var cloneOptions = tslib_1.__assign({ checkout: repocopy.checkout, shallow: repocopy.checkout === "master" }, opts);
        console.log("cloneOptions", cloneOptions);
        console.log("gitclone", "url" + url, "dest" + dest);
        console.log(cloneOptions);
        (0, git_clone_1.default)(url, dest, cloneOptions, function (err) {
            if (err === undefined) {
                (0, rimraf_1.sync)(dest + "/.git");
                fn();
            }
            else {
                fn(err);
            }
        });
    }
    else {
        var downloadOptions = tslib_1.__assign(tslib_1.__assign({ extract: true, strip: 1, mode: "666" }, opts), { headers: tslib_1.__assign({ accept: "application/zip" }, (opts.headers || {})) });
        (0, download_1.default)(url, dest, downloadOptions)
            .then(function data() {
            fn();
        })
            .catch(function (err) {
            fn(err);
        });
    }
}
exports.download = download;
/**
 * @msg:
 * @param {string} repo
 * @return {*}
 * @Descripttion:
 */
function normalize(repo) {
    var regex = /^(?:(direct):([^#+])(?:#(.+))?)$/;
    var match = regex.exec(repo);
    if (!!match) {
        var url = match[2];
        var directCheckout = match[3] || "master";
        return {
            type: "direct",
            origin: url,
            owner: "",
            name: "",
            checkout: directCheckout,
            url: "",
        };
    }
    else {
        regex =
            /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
        match = regex.exec(repo);
        if (!!match) {
            var type = match[1] || "github";
            var origin_1 = match[2] || "";
            var owner = match[3];
            var name_1 = match[4];
            var checkout = match[5] || "master";
            if (origin_1 === null) {
                if (type === "github") {
                    origin_1 = "github.com";
                }
                else if (type === "gitlab") {
                    origin_1 = "gitlab.com";
                }
                else if (type === "bitbucket") {
                    origin_1 = "bitbucket.org";
                }
            }
            return {
                type: type,
                origin: origin_1,
                owner: owner,
                name: name_1,
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
exports.normalize = normalize;
/**
 * @msg:
 * @param {string} origin
 * @param {boolean} clone
 * @return {*}
 * @Descripttion:
 */
function addProtocal(origin, clone) {
    if (!/^(f|ht)tps?:\/\//i.test(origin)) {
        if (clone) {
            origin = "git@" + origin;
        }
        else {
            origin = "https://" + origin;
        }
    }
    return origin;
}
exports.addProtocal = addProtocal;
/**
 * @msg:
 * @param {INalmalize} repo
 * @param {string} clone
 * @return {*}
 * @Descripttion:
 */
function getUrl(repo, clone) {
    var url = "";
    var origin = addProtocal(repo.origin, clone);
    if (/^git@/i.test(origin)) {
        origin = origin + ":";
    }
    else {
        origin = origin + "/";
    }
    if (!!clone) {
        url = origin + repo.owner + "/" + repo.name + ".git";
    }
    else {
        if (repo.type === "github") {
            url =
                origin +
                    repo.owner +
                    "/" +
                    repo.name +
                    "/archive/" +
                    repo.checkout +
                    ".zip";
        }
        else if (repo.type === "gitlab") {
            url =
                origin +
                    repo.owner +
                    "/" +
                    repo.name +
                    "/repository/archive.zip?ref=" +
                    repo.checkout;
        }
        else if (repo.type === "bitbucket") {
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
exports.getUrl = getUrl;
exports.default = download;
