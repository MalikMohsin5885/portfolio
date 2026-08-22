import { Download } from "lucide-react";
import { downloadResume, RESUME_FILENAME, RESUME_URL } from "../../utils/resumeDownload";

const ResumeFab = () => (
  <a
    href={RESUME_URL}
    download={RESUME_FILENAME}
    onClick={downloadResume}
    className="resume-fab fixed bottom-24 right-4 z-[45] flex h-14 w-14 items-center justify-center rounded-full border border-vast/15 bg-lumen-dark text-vast shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition-transform hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
    aria-label="Download resume"
    title="Download resume"
  >
    <Download className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
  </a>
);

export default ResumeFab;
