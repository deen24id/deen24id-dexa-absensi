"use client";

import { useRef, useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { CameraIcon, Settings2Icon } from "lucide-react";
import { Camera, CameraType } from "react-camera-pro";
import { Button } from "@heroui/button";
import Image from "next/image";

import { RowSteps } from "./row-steps";

export function Form() {
  const [step, setStep] = useState(0);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined
  );
  const camera = useRef<CameraType>(null);

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind == "videoinput");

      setDevices(videoDevices);
      setActiveDeviceId(videoDevices[0].deviceId);
    })();
  }, []);

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
    } else if (step === 1) {
      setStep(0);
    }
  };
  const clickNext = () => {
    setStep(step + 1);
  };

  const isDisabledCamera = !!image;
  const isDisabledPrev = !!!image;
  const isDisabledNext = !!!image;

  return (
    <div className="flex flex-col w-full items-center gap-4">
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
      <div className="w-full flex flex-col items-center gap-2">
        {step === 0 && (
          <div className="h-[32vh] aspect-square">
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
                videoSourceDeviceId={activeDeviceId}
              />
            ) : (
              <Image
                alt="selfie"
                className="w-full h-full"
                height={0}
                src={image}
                width={0}
              />
            )}
          </div>
        )}
        {step === 0 && (
          <div className="w-[32vh] flex gap-[2%]">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="w-[49%]"
                  color="secondary"
                  isDisabled={isDisabledCamera}
                  size="sm"
                  variant="bordered"
                >
                  <Settings2Icon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="List of camera"
                selectionMode="single"
                onAction={(key: any) => {
                  setActiveDeviceId(key);
                }}
              >
                {devices.map((val) => (
                  <DropdownItem key={val.deviceId}>{val.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              disableRipple
              className="w-[49%]"
              color="secondary"
              isDisabled={isDisabledCamera}
              size="sm"
              onPress={clickCamera}
            >
              <CameraIcon />
            </Button>
          </div>
        )}
        {step === 1 && <span className="h-full">test</span>}
      </div>
      <div className="flex flex-row gap-[8%] w-[60%] ">
        <Button
          disableRipple
          className="w-[46%]"
          color="primary"
          isDisabled={isDisabledPrev}
          variant="bordered"
          onPress={clickPrev}
        >
          {step === 0 ? "ulangi" : "kembali"}
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
