import { FC } from "react";
import CardTareaSprint from "../CardTareaSprint/CardTareaSprint";
import { sprintStore } from "../../../store/sprintStore";

interface IProps {
  title: string;
}

const ContainerTareaSprint: FC<IProps> = ({ title }) => {
  const sprintActive = sprintStore((state) => state.sprintActiva);

  const tareasFiltradas =
    sprintActive?.tareas.filter((t) => t.estado === title) || [];

  return (
    <div className="bg-[#D9D9D9]  flex-1 rounded-[7px] flex flex-col items-center ">
      <div className="!p-3 mx-auto w-[90%] text-center">
        <h1 className="!p-3 text-2xl font-bold border-b-2 border-[#001233]">
          {title}
        </h1>
      </div>

      <div className="w-full flex-1 overflow-y-auto flex flex-col items-center gap-[2vw] mt-[10px]">
        <CardTareaSprint tareas={tareasFiltradas} />
      </div>
    </div>
  );
};

export default ContainerTareaSprint;
