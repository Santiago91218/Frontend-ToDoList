import { FC } from "react";
import { ISprint } from "../../../../types/ISprint";

interface IProps {
  closeModal: () => void;
  sprint: ISprint;
}

const ModalVerSprint: FC<IProps> = ({ closeModal, sprint }) => {
  return (
    <>
      <div className="fixed inset-0  flex justify-center items-center z-[999]  backdrop-blur-sm backdrop-brightness-90">
        <div className="w-[27rem] h-[25rem] flex flex-col text-xl justify-around shadow-[5px_5px_10px_5px_gray] bg-white rounded">
          <div className="text-center !pt-3 font-bold text-2xl">
            Nombre Sprint: {sprint.titulo}
          </div>
          <div className="!pl-4 text-2xl">
            <h1>Fecha Inicio: {sprint.fechaInicio}</h1>
            <h1>Fecha Cierre: {sprint.fechaCierre}</h1>
          </div>
          <div className="text-center">
            <button
              onClick={closeModal}
              className="bg-[#001233] text-white !px-3 rounded hover:cursor-pointer hover:bg-[#042052]"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVerSprint;
