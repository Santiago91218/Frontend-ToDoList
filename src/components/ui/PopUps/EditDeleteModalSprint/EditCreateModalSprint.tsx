import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { sprintStore } from "../../../../store/sprintStore";
import { ISprint } from "../../../../types/ISprint";
import Swal from "sweetalert2";
import { ServiceSprint } from "../../../../services/serviceSprint";

interface IProps {
  closeModal: () => void;
  modo: "crear" | "editar";
}

const initialState: ISprint = {
  titulo: "",
  fechaInicio: "",
  fechaCierre: "",
  tareas: [],
};

const EditCreateModalSprint: FC<IProps> = ({ closeModal, modo }) => {
  const sprintActive = sprintStore((state) => state.sprintActiva);
  const setSprintActive = sprintStore((state) => state.setSprintActiva);

  const [formValues, setFormValues] = useState<ISprint>(initialState);
  const sprintService = new ServiceSprint();

  useEffect(() => {
    if (modo === "editar" && sprintActive) {
      setFormValues(sprintActive);
    } else {
      setFormValues(initialState);
    }
  }, [modo, sprintActive]);

  const handleClose = async () => {
    setSprintActive(null);
    closeModal();
  };

  const createSprint = async () => {
    try {
      await sprintService.createSprint(formValues);

      Swal.fire({
        title: "Sprint creada con exito!",
        icon: "success",
      });
    } catch (err) {
      console.log("Error al crear la sprint");
      Swal.fire({
        title: "Error al crear sprint",
        icon: "error",
      });
    }
  };

  const editSprint = async (idSprint: number, sprintEdit: ISprint) => {
    try {
      await sprintService.editSprint(idSprint, sprintEdit);
      Swal.fire({
        title: "Sprint editada con exito!",
        icon: "success",
      });
    } catch (err) {
      console.log("Error al editar la sprint");
      Swal.fire({
        title: "Error al editar sprint",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (modo === "editar" && sprintActive) {
      await editSprint(sprintActive.id!, formValues);
    } else {
      await createSprint();
    }

    handleClose();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999] backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-[#fff] shadow-[5px_5px_10px_5px_gray] w-[30%] !p-[12px] flex flex-col gap-8 items-center justify-center p-1 rounded">
        <div className="w-[100%] flex justify-center items-center !mb-[20px]">
          <h1 className="text-[40px]">
            {modo === "editar" ? "Editar Sprint" : "Crear Sprint"}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 w-[100%] relative"
        >
          <input
            name="titulo"
            type="text"
            required
            placeholder="Ingrese un titulo"
            value={formValues.titulo}
            onChange={handleChange}
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <label
            htmlFor="fechaInicio"
            className="text-[#696666] absolute top-[45px] left-[75px] text-sm"
          >
            Fecha Inicio
          </label>
          <input
            name="fechaInicio"
            type="date"
            autoComplete="off"
            value={formValues.fechaInicio}
            required
            onChange={handleChange}
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <label
            htmlFor="fechaCierre"
            className="text-[#696666] absolute top-[112px] left-[75px] text-sm"
          >
            Fecha Cierre
          </label>
          <input
            name="fechaCierre"
            type="date"
            autoComplete="off"
            required
            value={formValues.fechaCierre}
            onChange={handleChange}
            className="text-[#696666] w-[70%] !p-[0.4rem] border-1 border-[#B4A490] rounded-[0.5rem] cursor-pointer bg-[#CAC0B3]/60 focus:outline-none hover:bg-[#CAC0B3]/80"
          />
          <div className="flex gap-[4vw] !mt-[30px]">
            <button
              type="button"
              onClick={handleClose}
              className="!p-[0.3rem] w-[6vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem] cursor-pointer mt-[30px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="!p-[0.3rem] w-[7vw] text-[#CAC0B3] bg-[#001233]/95 hover:bg-[#042052] text-[1vw]  rounded-[0.4rem]  cursor-pointer mt-[30px]"
            >
              {modo === "editar" ? "Editar Sprint" : "Crear Sprint"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCreateModalSprint;
