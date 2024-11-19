export type TransformCaseFormatTypeProps =
  | "small"
  | "capital"
  | "allcaps"
  | "default";

export type TransformCaseTypeProps = {
  text: string;
  format: TransformCaseFormatTypeProps;
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
