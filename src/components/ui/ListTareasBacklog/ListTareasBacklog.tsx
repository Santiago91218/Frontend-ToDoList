import { useEffect, useState } from "react";
import { CardTareaBacklog } from "../CardTareaBacklog/CardTareaBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/ITarea";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { ServiceTarea } from "../../../services/serviceTarea";

export const ListTareasBacklog = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);
  const [tareas, setTareas] = useState<any[]>([]);
  const tareaService = new ServiceTarea();
  const [openModalTarea, setOpenModalTarea] = useState(false);

  useEffect(() => {
    getTareas();
  }, [tareas]);

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
    setTareaActiva(null);
  };

  const getTareas = async () => {
    const tareasObtenidas = await tareaService.getAllTasks();
    setTareas(tareasObtenidas);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-[3vh] w-[100%] !mt-[10px] !p-[1vw]">
        {tareas.length > 0 ? (
          tareas.map((el) => (
            <CardTareaBacklog
              key={el.id}
              handleOpenModalEdit={handleOpenModalEdit}
              tarea={el}
            />
          ))
        ) : (
          <p className="text-gray-600 mt-4">No hay tareas</p>
        )}
      </div>
      {openModalTarea && <CrearTarea closeModal={handleCloseModal} />}
    </>
  );
};
