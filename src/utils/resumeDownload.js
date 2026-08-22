import resumePDF from "../assets/Mohsin Rasheed Resume.pdf";

export const RESUME_FILENAME = "Mohsin Rasheed Resume.pdf";
export const RESUME_URL = resumePDF;

export function downloadResume(event) {
  event?.preventDefault();
  const link = document.createElement("a");
  link.href = RESUME_URL;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
