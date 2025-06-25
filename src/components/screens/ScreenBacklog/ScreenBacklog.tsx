import { Header } from "../../ui/Header/Header";
import { ViewSprints } from "../../ui/ViewSprints/ViewSprints";
import { ViewTareasBacklog } from "../../ui/ViewTareasBacklog/ViewTareasBacklog";

export const ScreenBacklog = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-5 h-[95vh]">
        <div className="col-span-1 bg-[#E8E8E8] !p-[7px]">
          <ViewSprints />
        </div>
        <div className="col-span-4 ">
          <ViewTareasBacklog />
        </div>
      </div>
    </div>
  );
};
