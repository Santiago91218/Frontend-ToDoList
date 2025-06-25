import { FC, useEffect, useState } from "react";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { IconVer } from "../Icons/IconVer";
import { ITarea } from "../../../types/ITarea";
import { tareaStore } from "../../../store/tareaStore";
import ModalVerTarea from "../PopUps/ModalTarea/ModalVerTarea";
import Swal from "sweetalert2";
import { ISprint } from "../../../types/ISprint";
import { ServiceTarea } from "../../../services/serviceTarea";
import { ServiceSprint } from "../../../services/serviceSprint";

type ICardTareaBacklog = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardTareaBacklog: FC<ICardTareaBacklog> = ({
  tarea,
  handleOpenModalEdit,
}) => {
  const [modalVer, setModalVer] = useState<boolean>(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [sprintSeleccionado, setSprintSeleccionado] = useState<string | "">("");
  const [vencer, setVencer] = useState<boolean>(false);
  const tareaService = new ServiceTarea();
  const sprintService = new ServiceSprint();
  const [sprints, setSprints] = useState<ISprint[]>([]);

  useEffect(() => {
    filtrarTareasVencer();
  }, [tarea]);

  const handleCloseModalVer = () => {
    setModalVer(false);
  };

  const editarTarea = () => {
    setTareaActiva(tarea);
    handleOpenModalEdit(tarea);
  };

  const handleEliminarTarea = async (idTask: number) => {
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
      await tareaService.deleteTask(idTask);
      Swal.fire({
        title: "Eliminado",
        icon: "success",
      });
    }
  };

  const filtrarTareasVencer = () => {
    const fechaLimiteTarea = new Date(tarea.fechaLimite);
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaActual.getDate() + 3);

    if (fechaLimiteTarea >= fechaActual && fechaLimiteTarea <= fechaLimite) {
      return setVencer(true);
    }

    setVencer(false);
  };

  const sendTaskSprint = async (idTask: number) => {
    if (!sprintSeleccionado) {
      return "No se encontro el sprint seleccionado";
    }

    const sprintDestino = sprints.find(
      (s) => s.id === parseInt(sprintSeleccionado)
    );

    if (!sprintDestino) {
      return "No se encotro la sprint de destino";
    }

    try {
      await sprintService.addTaskSprint(sprintDestino.id!, idTask);

      Swal.fire({
        title: "Tarea enviada correctamente al sprint",
        icon: "success",
      });
      setSprintSeleccionado("");
    } catch (error) {
      console.log("Error al enviar tarea a la sprint:", error);
      Swal.fire({
        title: "Error",
        text: "No se enviar la tarea a la sprint",
        icon: "error",
      });
    }
  };

  const fetchSprints = async () => {
    const sprintsObtenidas = await sprintService.getAllSprints();
    setSprints(sprintsObtenidas);
  };

  useEffect(() => {
    fetchSprints();
  }, []);

  return (
    <div
      className={`${
        vencer ? "bg-red-300" : "bg-[#D9D9D9]"
      } flex !p-[0.6vw] w-[90%] justify-between rounded-[0.5rem] shadow-xs`}
    >
      <div className="flex flex-col gap-[2vh]">
        <p>
          <b>Titulo: {tarea.titulo}</b>
        </p>
        <p>
          <b>Descripción: {tarea.descripcion}</b>
        </p>
      </div>

      {modalVer && (
        <ModalVerTarea tarea={tarea} closeModal={handleCloseModalVer} />
      )}

      <div className="flex items-center gap-[1vw] ">
        <button
          className="bg-[#001233]/90 text-[#CAC0B3] cursor-pointer rounded-md hover:bg-[#001233] flex items-center gap-[0.4vw] !p-[0.3vw]"
          onClick={() => {
            sendTaskSprint(tarea.id!);
          }}
        >
          Enviar a <span className="material-symbols-outlined ">send</span>
        </button>

        <select
          value={sprintSeleccionado}
          onChange={(e) => setSprintSeleccionado(e.target.value)}
          className="!p-[0.5vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none"
        >
          <option value="" disabled>
            Selecciona una sprint
          </option>
          {sprints.map((sprint) => (
            <option value={sprint.id} key={sprint.id}>
              {sprint.titulo}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-[0.36vw]">
          <span
            onClick={() => {
              setModalVer(true);
            }}
          >
            <IconVer size="1.72vw" />
          </span>
          <span onClick={editarTarea}>
            <IconEditar size="1.72vw" />
          </span>
          <span
            onClick={() => {
              handleEliminarTarea(tarea.id!);
            }}
          >
            <IconEliminar size="1.72vw" />
          </span>
        </div>
      </div>
    </div>
  );
};
