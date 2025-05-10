"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Camera } from "lucide-react";

import { RowSteps } from "./row-steps";

export function Form() {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col w-full items-center">
      <RowSteps
        className=""
        currentStep={step}
        steps={[
          {
            title: "Ambil foto pribadi",
          },
          {
            title: "Pastikan lokasi anda",
          },
          {
            title: "Pratinjau dan kirim data absensi",
          },
          {
            title: "Data absensimu telah diterima",
          },
        ]}
        onStepChange={(stepIndex) => setStep(stepIndex)}
      />
      <Button color="primary" variant="shadow" onClick={() => setStep(3)}>
        <Camera />
      </Button>
    </div>
  );
}
