import Link from "next/link";

interface IAppButtonLinkProps {
  title: string;
  className?: string;
}

export default function AppButton({
  title,
  className = "",
}: IAppButtonLinkProps) {
  return (
    <Link
      href="/#"
      className={`p-[6px] px-4 rounded-full bg-[#F1F1F1] ${className}`}
    >
      {title}
    </Link>
  );
}
