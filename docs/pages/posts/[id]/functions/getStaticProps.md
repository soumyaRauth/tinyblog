[**tinyblog v0.1.0**](../../../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../../../modules.md) / [pages/posts/\[id\]](../README.md) / getStaticProps

# Function: getStaticProps()

> **getStaticProps**(`context`): `GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

Fetches the details of a single post at build time.

Uses a higher-order utility function to handle data fetching and revalidation.

## Parameters

• **context**: `GetStaticPropsContext`\<`ParsedUrlQuery`, `PreviewData`\>

## Returns

`GetStaticPropsResult`\<`object`\> \| `Promise`\<`GetStaticPropsResult`\<`object`\>\>

- Post data with revalidation info.

## Example

```ts
const { props } = await getStaticProps({ params: { id: "1" } });
console.log(props.post.data.title); // "Post Title"
```

## Defined in

[pages/posts/\[id\]/index.tsx:145](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/posts/[id]/index.tsx#L145)
