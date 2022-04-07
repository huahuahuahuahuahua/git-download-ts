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
export declare type TAnyFunction = (...args: any[]) => void;
/**
 * @msg:
 * @param {string} repo
 * @param {string} dest
 * @param {IOpts} opts
 * @param {TAnyFunction} fn
 * @return {void}
 * @Descripttion:
 */
export declare function download(repo: string, dest: string, opts: IOpts, fn: TAnyFunction): void;
/**
 * @msg:
 * @param {string} repo
 * @return {*}
 * @Descripttion:
 */
export declare function normalize(repo: string): INalmalize;
/**
 * @msg:
 * @param {string} origin
 * @param {boolean} clone
 * @return {*}
 * @Descripttion:
 */
export declare function addProtocal(origin: string, clone: boolean): string;
/**
 * @msg:
 * @param {INalmalize} repo
 * @param {string} clone
 * @return {*}
 * @Descripttion:
 */
export declare function getUrl(repo: INalmalize, clone: boolean): string;
export default download;
