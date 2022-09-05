import NextImage, { ImageLoaderProps } from "next/image";
import { ComponentProps } from "react";

const loader = ({ src }: ImageLoaderProps) => src;

const Image = ({ src, alt, ...props }: ComponentProps<typeof NextImage>) => (
  <NextImage loader={loader} src={src} alt={alt} {...props} unoptimized />
);

export default Image;
