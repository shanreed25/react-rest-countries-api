import type { StatusMessageProps } from "../types/countryDisplayTypes";



/*
A message box that will be used for every status in the app
using children so I can add a heading, a paragraph, and a button inside it
*/
export function StatusMessage({ children, role = "status" }: StatusMessageProps) {
  return (
    <div role={role} className="py-12 text-center">
      {children}
    </div>
  );
}