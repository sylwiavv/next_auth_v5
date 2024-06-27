'use client'
import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button";

const buttonsClassName = "w-full p-2"
const iconsClassName = "h-5 w-5"

const BUTTONS = [
    {
        size: "large",
        variant: "outline",
        className: buttonsClassName,
        icon: <FcGoogle className={iconsClassName} />
    },
    {
        size: "large",
        variant: "outline",
        className: buttonsClassName,
        icon: <FaGithub className={iconsClassName} />
    }
]

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">
            {BUTTONS.map(({size, variant, className, icon}, index) => (
                <Button key={index} size={size} className={className} variant={variant} onClick={() => console.log("hello")}>
                    {icon}
                </Button>
            ))}
        </div>
    );
}