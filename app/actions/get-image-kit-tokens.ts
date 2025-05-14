"use server";

import { getUploadAuthParams } from "@imagekit/next/server";

export async function getImageKitTokens() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  });

  return {
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  };
}
