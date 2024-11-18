export type TransformCaseFormatTypeProps =
  | "small"
  | "capital"
  | "allcaps"
  | "default";

export type TransformCaseTypeProps = {
  text: string;
  format: TransformCaseFormatTypeProps;
};
