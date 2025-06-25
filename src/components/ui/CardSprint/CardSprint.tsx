import { FC, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import { ISprint } from "../../../types/ISprint";
import { useNavigate } from "react-router";
import { sprintStore } from "../../../store/sprintStore";
import ModalVerSprint from "../PopUps/ModalVerSprint/ModalVerSprint";
import Swal from "sweetalert2";
import { ServiceSprint } from "../../../services/serviceSprint";

type IProps = {
  sprint: ISprint;
  handleOpenModalEdit: (sprint: ISprint) => void;
};

export const CardSprint: FC<IProps> = ({ sprint, handleOpenModalEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSprintActiva = sprintStore((state) => state.setSprintActiva);
  const navigate = useNavigate();
  const sprintService = new ServiceSprint();

  const handleSprintClick = () => {
    setSprintActiva(sprint);
    navigate(`/sprint/${sprint.id}`);
  };

  const handleEliminarSprint = async (idSprint: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No se puede revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (result.isConfirmed) {
      await sprintService.deleteTask(idSprint);
      Swal.fire({
        title: "Eliminado",
        icon: "success",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const editarSprint = () => {
    handleOpenModalEdit(sprint);
  };
  return (
    <>
      <div className="bg-[#CAC0B3]/60 w-[17vw]  flex flex-col gap-[1.3vh] !mt-[4vh] rounded-[0.5rem] transition-all duration-200 ease-in-out shadow-lg ">
        <div
          className="border-b-[2px] border-white w-[100%] cursor-pointer"
          onClick={handleSprintClick}
        >
          <div className="flex flex-col gap-[0.2vh] !p-[0.5vw]">
            <h3 className="text-[1.5vw]">{sprint.titulo}</h3>
            <p>
              <b>Inicio:</b> {sprint.fechaInicio}
            </p>
            <p>
              <b>Cierre:</b> {sprint.fechaCierre}
            </p>
          </div>
        </div>

        <div className="flex gap-[3vw] items-center text-center justify-around !pb-[0.3vw] ">
          <div onClick={() => setIsModalOpen(true)}>
            <IconVer size={"1.6vw"} />
          </div>
          <div onClick={() => editarSprint()}>
            <IconEditar size={"1.6vw"} />
          </div>
          <div onClick={() => handleEliminarSprint(sprint.id!)}>
            <IconEliminar size={"1.6vw"} />
          </div>
        </div>
        {isModalOpen && (
          <ModalVerSprint closeModal={handleCloseModal} sprint={sprint} />
        )}
      </div>
    </>
  );
};
