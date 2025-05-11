"use client";

import { useRef, useState } from "react";
import { Button } from "@heroui/button";
import { CameraIcon } from "lucide-react";
import { Camera, CameraType } from "react-camera-pro";

import { RowSteps } from "./row-steps";

export function Form() {
  const [step, setStep] = useState(0);
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string | null>(null);

  const clickCamera = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();

      setImage(photo as string);
    }
  };
  const clickPrev = () => {
    if (step === 0) {
      setImage(null);
    }
  };
  const clickNext = () => {
    setStep(step + 1);
  };

  const isDisabledCamera = !!image;
  const isDisabledPrev = !!!image;
  const isDisabledNext = !!!image;

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <RowSteps
        className=""
        currentStep={step}
        steps={[
          {
            title: "Ambil potret diri anda",
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
      />
      <div className="w-[40%]">
        {image === null ? (
          <Camera
            ref={camera}
            aspectRatio={1}
            errorMessages={{
              noCameraAccessible:
                "Tidak ada perangkat kamera yang dapat diakses. Harap hubungkan kamera Anda atau coba peramban lain.",
              permissionDenied:
                "Izin ditolak. Harap muat ulang halaman ini dan berikan izin kamera.",
              switchCamera:
                "Tidak dimungkinkan untuk mengganti kamera ke kamera lain karena hanya ada satu perangkat video yang dapat diakses.",
              canvas: "Kanvas tidak didukung",
            }}
            facingMode="user"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="selfie" src={image} />
        )}
      </div>
      <Button
        disableRipple
        color="secondary"
        isDisabled={isDisabledCamera}
        size="sm"
        onPress={clickCamera}
      >
        <CameraIcon />
      </Button>
      <div className="flex flex-row gap-[8%] w-[60%] ">
        <Button
          disableRipple
          className="w-[46%]"
          color="primary"
          isDisabled={isDisabledPrev}
          variant="bordered"
          onPress={clickPrev}
        >
          Ulangi
        </Button>
        <Button
          disableRipple
          className="w-[46%]"
          color="primary"
          isDisabled={isDisabledNext}
          variant="shadow"
          onPress={clickNext}
        >
          Lanjut
        </Button>
      </div>
    </div>
  );
}
