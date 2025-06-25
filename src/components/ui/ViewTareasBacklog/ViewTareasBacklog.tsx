import { useState } from "react";
import { CrearTarea } from "../PopUps/CrearTarea/CrearTarea";
import { ListTareasBacklog } from "../ListTareasBacklog/ListTareasBacklog";

export const ViewTareasBacklog = () => {
  const [openModalTarea, setOpenModalTarea] = useState(false);

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  return (
    <>
      <div className="col-span-4 p-8 flex flex-col items-center">
        <div className="flex w-full !p-[0.5%] items-center justify-between">
          <h2 className="text-3xl font-bold"> Tareas del Backlog </h2>

          <button
            onClick={() => {
              setOpenModalTarea(true);
            }}
            className="bg-[#001233]/90 w-36 h-10 text-[#CAC0B3] text-base rounded-md hover:bg-[#001233] cursor-pointer"
          >
            Añadir tarea
          </button>
        </div>

        {openModalTarea && <CrearTarea closeModal={handleCloseModal} />}
        <hr
          className="border-t-2 border-[#001233] top-16 mb-4 mx-auto"
          style={{ width: "98%" }}
        />
      </div>
      <ListTareasBacklog />
    </>
  );
};
