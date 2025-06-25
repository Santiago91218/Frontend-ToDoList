import { Header } from "../../ui/Header/Header";
import { ViewSprints } from "../../ui/ViewSprints/ViewSprints";
import { ViewTareasSprint } from "../../ui/ViewTareaSprint/ViewTareaSprint";

export const ScreenSprint = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-5 h-[95vh]">
        <div className="col-span-1 bg-[#E8E8E8] !p-[7px]">
          <ViewSprints />
        </div>
        <div className="col-span-4 ">
          <ViewTareasSprint />
        </div>
      </div>
    </div>
  );
};
