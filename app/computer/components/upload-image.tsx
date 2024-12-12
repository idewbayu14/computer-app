"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

type ImageUploadProps = {
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    values: string[]
};

export const ImageUpload = ({onChange, onRemove, values}: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    
    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    return (
<>
      <div className={"mb-4 flex items-center gap-4"}>
        {values.map((url) => (
          <div
            key={url}
            className={
              "relative w-[200px] h-[200px] rounded-md overflow-hidden"
            }
          >
            <div className={"z-10 absolute top-2 right-2"}>
              <Button
                type={"button"}
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className={"h-4 w-4"} />
              </Button>
            </div>
            <Image fill 
            className={"object-cover"} 
            alt={"Image"} 
            src={`${url}`} 
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="g4i8smpr">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              variant={"secondary"}
              onClick={onClick}
            >
              <ImagePlus className={"h-4 w-4 mr-2"} />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
    )  
}