[**tinyblog v0.1.0**](../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../modules.md) / [pages](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`context`): `GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

Static Props Function

Fetches blog posts at build time and adds revalidation support for incremental static regeneration.

## Parameters

• **context**: `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\>

## Returns

`GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

- Fetched posts and revalidation info.

## Example

```ts
const { props } = await getStaticProps();
console.log(props.posts.data); // Array of blog posts
```

## Defined in

[pages/index.tsx:51](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/index.tsx#L51)
