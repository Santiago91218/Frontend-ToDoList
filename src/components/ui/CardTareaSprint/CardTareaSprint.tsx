import { IconVer } from "../Icons/IconVer";
import { IconEditar } from "../Icons/IconEditar";
import { IconEliminar } from "../Icons/IconEliminar";
import { ITarea } from "../../../types/ITarea";
import { FC, useState } from "react";
import ModalVerTarea from "../PopUps/ModalTarea/ModalVerTarea";
import { tareaStore } from "../../../store/tareaStore";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import Swal from "sweetalert2";
import { sprintStore } from "../../../store/sprintStore";
import { ServiceSprint } from "../../../services/serviceSprint";
import { ServiceTarea } from "../../../services/serviceTarea";

interface IProps {
  tareas: ITarea[];
}

const CardTareaSprint: FC<IProps> = ({ tareas }) => {
  const [modalVer, setModalVer] = useState<boolean>(false);
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const sprintActive = sprintStore((state) => state.sprintActiva);
  const sprintService = new ServiceSprint();
  const tareaService = new ServiceTarea();
  const coloresCard = {
    Pendiente: "bg-[#E74C3C]/85",
    Progreso: "bg-[#F1C40F]/85",
    Completado: "bg-[#2ECC71]/85",
  };

  const handleCloseModalVer = () => {
    setModalVer(false);
    setTareaActiva(null);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
    setTareaActiva(null);
  };

  const actualizarEstadoTarea = async (
    idTask: number,
    newState: ITarea["estado"]
  ) => {
    if (!sprintActive) return;

    await tareaService.updateStateTask(idTask, newState!);
  };

  const eliminarTareaSprint = async (idTask: number) => {
    try {
      if (!sprintActive) return;

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
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const moveTaskBacklog = async (idTask: number) => {
    if (!idTask || !sprintActive) return;

    const tarea = sprintActive.tareas.find((t) => t.id === idTask);
    if (!tarea) {
      console.log("Tarea no encontrada en el sprint ");
      return;
    }

    try {
      await sprintService.moveTaskBacklog(sprintActive.id!, idTask);
      await tareaService.updateStateTask(idTask, "Pendiente");
      Swal.fire({
        title: "Tarea enviada correctamente al backlog",
        icon: "success",
      });
    } catch (error) {
      console.log("Error al enviar tarea al backlog:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo enviar la tarea al backlog",
        icon: "error",
      });
    }

    await sprintService.moveTaskBacklog(sprintActive.id!, idTask);
  };
  return (
    <>
      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className={`w-[90%] flex flex-col gap-[0.2vh] rounded-[4px] !mb-[10px] !px-[0.6vw] !pt-[0.6vw]  ${
            coloresCard[tarea.estado!]
          }`}
        >
          <h1 className="text-[1.5vw]">Titulo: {tarea.titulo}</h1>
          <p>
            <b>Descripcion:</b> {tarea.descripcion}
          </p>
          <p>
            <b>Fecha Límite:</b> {tarea.fechaLimite}
          </p>

          <div className="flex justify-center gap-[3%] !py-2 ">
            <button
              className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"
              onClick={() => {
                moveTaskBacklog(tarea.id!);
              }}
            >
              Enviar al backlog
            </button>
            <select
              value={tarea.estado}
              onChange={(e) => {
                actualizarEstadoTarea(
                  tarea.id!,
                  e.target.value as ITarea["estado"]
                );
              }}
              className="text-[0.9vw] !p-[0.4vw] bg-[#001233]/90 !px-1 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer outline-none border-none"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Progreso">En progreso</option>
              <option value="Completado">Completado</option>
            </select>

            {modalVer && (
              <ModalVerTarea tarea={tarea} closeModal={handleCloseModalVer} />
            )}

            {modalEdit && <CrearTarea closeModal={handleCloseModalEdit} />}

            <div className="flex gap-[5%] items-center ">
              <div
                onClick={() => {
                  setModalVer(true);
                }}
              >
                <IconVer size={"1.6vw"} />
              </div>
              <div
                onClick={() => {
                  setModalEdit(true);
                  setTareaActiva(tarea);
                }}
              >
                <IconEditar size={"1.5vw"} />
              </div>
              <div
                onClick={() => {
                  eliminarTareaSprint(tarea.id!);
                }}
              >
                <IconEliminar size={"1.5vw"} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardTareaSprint;
