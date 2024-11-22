[**tinyblog v0.1.0**](../../../../README.md) • **Docs**

***

[tinyblog v0.1.0](../../../../modules.md) / [pages/posts/recent](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

RecentPosts Component

Displays a list of the most recent blog posts along with the last revalidation timestamp.
Includes:
- A `Header` with a title.
- The revalidation timestamp to indicate when the data was last updated.
- A `PostList` component to render the recent posts.

## Parameters

• **props**

Props returned from `getStaticProps`.

## Returns

`Element`

The rendered RecentPosts page.

## Example

```ts
const recentPosts = { data: [{ id: 1, title: "Hello World" }], revalidateAt: "Friday, November 22, 2024, 04:35 PM" };
<RecentPosts recentPosts={recentPosts} />
```

## Defined in

[pages/posts/recent/index.tsx:26](https://github.com/soumyaRauth/tinyblog/blob/08b705b334f790cb2abe6139659ab77dc5d8c110/pages/posts/recent/index.tsx#L26)
