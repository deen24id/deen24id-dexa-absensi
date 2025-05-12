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
import { useGeolocated } from "react-geolocated";
import { Checkbox } from "@heroui/checkbox";

import MapDynamic from "./map-dynamic";
import { RowSteps } from "./row-steps";

import { updateTicket } from "@/app/actions/update-ticket";

type FormType = {
  status: "ditunggu" | "diterima" | "hilang" | null;
};

export function Form(props: FormType) {
  const [step, setStep] = useState(props.status === "ditunggu" ? 0 : 3);

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

  const isDisabledCamera = !!image;
  const isDisabledPrev = !!!image;

  const { coords } = useGeolocated();

  const clickPrev = () => {
    if (step === 0) {
      setImage(null);
    } else {
      setStep(step - 1);
    }
  };

  const clickNext = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (coords) {
        await updateTicket({ lat: coords?.latitude, lng: coords?.longitude });
        setStep(3);
      }
    }
  };

  const [isPrivacy, setIsPrivacy] = useState(false);
  const clickPrivacy = () => {
    setIsPrivacy(!isPrivacy);
  };

  const isDisabledNext = !!!image || (step === 2 && !isPrivacy);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <RowSteps
        color={step === 3 ? "success" : "primary"}
        currentStep={step}
        steps={[
          {
            title: "Ambil potret diri kamu",
          },
          {
            title: "Pastikan lokasi kamu",
          },
          {
            title: "Pratinjau dan kirim absensi",
          },
          {
            title: "Data absensimu telah diterima",
          },
        ]}
      />
      <div className="w-full flex flex-col items-center gap-2">
        {step === 0 && (
          <div className="h-[36vh] aspect-square">
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
          <div className="w-[36vh] flex gap-2">
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
        {step === 1 && coords && (
          <div className="relative h-[36vh] aspect-square">
            <MapDynamic
              center={{ lat: coords.latitude, lng: coords.longitude }}
            />
          </div>
        )}
        {step === 2 && image && coords && (
          <div className="w-full flex md:flex-row justify-center">
            <Image
              alt="selfie"
              className="w-[50%] md:w-[40%] aspect-square"
              height={0}
              src={image}
              width={0}
            />
            <div className="relative w-[50%] md:w-[40%] aspect-square">
              <MapDynamic
                center={{ lat: coords.latitude, lng: coords.longitude }}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <Checkbox isSelected={isPrivacy} onValueChange={clickPrivacy}>
            Saya menyutujui kebijakan privasi
          </Checkbox>
        )}
      </div>
      {step !== 3 && (
        <div className="flex flex-row gap-2 w-[36vh] ">
          <Button
            disableRipple
            className="w-full"
            color="primary"
            isDisabled={isDisabledPrev}
            variant="bordered"
            onPress={clickPrev}
          >
            {step === 0 ? "Ulangi" : "Kembali"}
          </Button>
          <Button
            disableRipple
            className="w-full"
            color="primary"
            isDisabled={isDisabledNext}
            variant="shadow"
            onPress={clickNext}
          >
            {step === 2 ? "Kirim" : "Lanjut"}
          </Button>
        </div>
      )}
    </div>
  );
}
