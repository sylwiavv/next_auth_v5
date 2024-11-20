import React from "react";
import Image from "next/image";

interface UserAvatarProps {
  imageSrc: string;
}

const UserAvatar = ({ imageSrc }: UserAvatarProps) => {
  return (
    // <div className="h-24 w-24 overflow-hidden rounded-xl relative">
      <Image
        // className="absolute -top-7 left-0 object-cover"
        src={imageSrc}
        width={100}
        height={100}
        alt="Picture of the author"
      />
    // </div>
  );
};

export default UserAvatar;