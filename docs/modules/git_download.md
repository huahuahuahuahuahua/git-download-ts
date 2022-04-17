[git-download](../README.md) / [Modules](../modules.md) / git-download

# Module: git-download

## Table of contents

### References

- [default](git_download.md#default)

### Interfaces

- [INalmalize](../interfaces/git_download.INalmalize.md)
- [IOpts](../interfaces/git_download.IOpts.md)

### Type aliases

- [TAnyFunction](git_download.md#tanyfunction)

### Functions

- [addProtocal](git_download.md#addprotocal)
- [download](git_download.md#download)
- [getUrl](git_download.md#geturl)
- [normalize](git_download.md#normalize)

## References

### default

Renames and re-exports [download](git_download.md#download)

## Type aliases

### TAnyFunction

Ƭ **TAnyFunction**: (...`args`: `any`[]) => `void`

#### Type declaration

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void`

#### Defined in

git-download.ts:24

## Functions

### addProtocal

▸ **addProtocal**(`origin`, `clone`): `string`

**`msg:`**

**`descripttion:`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `string` |
| `clone` | `boolean` |

#### Returns

`string`

#### Defined in

git-download.ts:147

___

### download

▸ **download**(`repo`, `dest`, `opts`, `fn`): `void`

**`msg:`**

**`descripttion:`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `repo` | `string` |
| `dest` | `string` |
| `opts` | [`IOpts`](../interfaces/git_download.IOpts.md) |
| `fn` | [`TAnyFunction`](git_download.md#tanyfunction) |

#### Returns

`void`

#### Defined in

git-download.ts:34

___

### getUrl

▸ **getUrl**(`repo`, `clone`): `string`

**`msg:`**

**`descripttion:`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `repo` | [`INalmalize`](../interfaces/git_download.INalmalize.md) |
| `clone` | `boolean` |

#### Returns

`string`

#### Defined in

git-download.ts:165

___

### normalize

▸ **normalize**(`repo`): [`INalmalize`](../interfaces/git_download.INalmalize.md)

**`msg:`**

**`descripttion:`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `repo` | `string` |

#### Returns

[`INalmalize`](../interfaces/git_download.INalmalize.md)

#### Defined in

git-download.ts:87
