import { useEffect, useState } from "react";
import ContainerTareaSprint from "../ContainerTareaSprint/ContainerTareaSprint";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { sprintStore } from "../../../store/sprintStore";
import { useParams } from "react-router";
import { ServiceSprint } from "../../../services/serviceSprint";
import { ISprint } from "../../../types/ISprint";

export const ViewTareasSprint = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { id } = useParams();
  const sprintActive = sprintStore((state) => state.sprintActiva);
  const { setSprintActiva } = sprintStore();
  const sprintService = new ServiceSprint();
  const [sprintss, setSprintss] = useState<ISprint>();

  const fetchSprints = async () => {
    const sprintsprr = await sprintService.getAllSprints();

    const sprint = sprintsprr.find((s) => s.id === parseInt(id!));
    setSprintActiva(sprint);
    setSprintss(sprint);
  };

  useEffect(() => {
    fetchSprints();
  }, [sprintss?.tareas]);

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div className="flex flex-col">
      <div className=" flex h-[8vh] !p-6 justify-between items-center">
        <h3 className="text-[1.7vw]">{sprintActive?.titulo}</h3>

        <button
          onClick={() => {
            setModal(true);
          }}
          className="bg-[#001233]/90 w-32 h-8 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"
        >
          Añadir Tarea
        </button>
      </div>
      {modal && <CrearTarea closeModal={handleCloseModal} />}
      <div className="flex justify-center h-[87vh] !p-[10px] gap-[1vw]">
        <ContainerTareaSprint title="Pendiente" />
        <ContainerTareaSprint title="Progreso" />
        <ContainerTareaSprint title="Completado" />
      </div>
    </div>
  );
};
