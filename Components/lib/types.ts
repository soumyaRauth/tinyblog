export type TransformCaseFormatTypeProps =
  | "small"
  | "title"
  | "upper"
  | "default";

export type TransformCaseTypeProps = {
  text: string;
  caseName: TransformCaseFormatTypeProps;
};

export type AuthorProps = {
  id: number;
  name: string;
  email: string;
};
export type PostTypeProps = {
  id: number;
  userId: number;
  author: AuthorProps;
  title: string;
  description?: string;
  body: string;
};

export type BackButtonProps = {
  href: string;
  color?: string;
};

export type AuthorPostsProps = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
