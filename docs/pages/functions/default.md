[**tinyblog v0.1.0**](../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../modules.md) / [pages](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

HomePage Component

Renders the homepage, including:
- A `Header` component displaying the blog's title.
- A `PostList` component to display all blog posts.

Data is fetched at build time using `getStaticProps` with incremental static regeneration.

## Parameters

• **props**

The props returned from `getStaticProps`.

## Returns

`Element`

The rendered homepage component.

## Example

```ts
const posts = [{ id: 1, title: "First Post", body: "Hello World!" }];
<HomePage posts={{ data: posts, revalidateAt: "Timestamp" }} />
```

## Defined in

[pages/index.tsx:25](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/index.tsx#L25)
