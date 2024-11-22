[**tinyblog v0.1.0**](../../../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../../../modules.md) / [pages/posts/recent](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`context`): `GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

Static Props Function

Fetches the six most recent posts at build time and adds revalidation support for incremental static regeneration.

## Parameters

• **context**: `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\>

## Returns

`GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

- Recent posts and revalidation info.

## Example

```ts
const { props } = await getStaticProps();
console.log(props.recentPosts.data); // Array of recent posts
```

## Defined in

[pages/posts/recent/index.tsx:62](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/posts/recent/index.tsx#L62)
