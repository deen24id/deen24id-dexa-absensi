"use client";

import { RowSteps } from "./row-steps";

export function Form() {
  return (
    <RowSteps
      defaultStep={2}
      steps={[
        {
          title: "Create",
        },
        {
          title: "Review",
        },
        {
          title: "Publish",
        },
      ]}
    />
  );
}
