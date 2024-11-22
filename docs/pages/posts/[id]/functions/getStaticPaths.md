[**tinyblog v0.1.0**](../../../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../../../modules.md) / [pages/posts/\[id\]](../README.md) / getStaticPaths

# Function: getStaticPaths()

> **getStaticPaths**(`context`): `GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

Generates paths for static generation of post detail pages.

Fetches all posts and creates paths for each post ID.

## Parameters

• **context**: `GetStaticPathsContext`

## Returns

`GetStaticPathsResult`\<`ParsedUrlQuery`\> \| `Promise`\<`GetStaticPathsResult`\<`ParsedUrlQuery`\>\>

- `paths`: An array of post paths with `id` and `userId`.
- `fallback`: Determines whether fallback pages are rendered for non-predefined paths.

## Example

```ts
const paths = await getStaticPaths();
console.log(paths.paths); // [{ params: { id: "1", userId: "1" } }, ...]
```

## Defined in

[pages/posts/\[id\]/index.tsx:124](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/posts/[id]/index.tsx#L124)
