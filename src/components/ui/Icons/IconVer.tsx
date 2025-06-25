import { FC } from "react";

interface IProps {
  size: string;
}

export const IconVer: FC<IProps> = ({ size }) => {
  return (
    <button className="bg-[#001233]/90 flex items-center justify-center !p-1 rounded-[0.5rem] cursor-pointer transition duration-300 hover:bg-[#001233]/80">
      <span
        className={"material-symbols-outlined text-[#CAC0B3]"}
        style={{ fontSize: size }}
      >
        visibility
      </span>
    </button>
  );
};
