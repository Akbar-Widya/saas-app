import { subjectsColors } from "@/constants"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSubjectColor = (subject: string) => {
   return subjectsColors[subject as keyof typeof subjectsColors]
}

// ternyata clsx dan cn udah masuk ke shad-cn.