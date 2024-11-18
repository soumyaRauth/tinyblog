export type TransformCaseFormatTypeProps =
  | "small"
  | "capital"
  | "allcaps"
  | "default";

export type TransformCaseTypeProps = {
  text: string;
  format: TransformCaseFormatTypeProps;
};

export type PostTypeProps = {
  id: number;
  title: string;
  description: string;
  body: string;
};
