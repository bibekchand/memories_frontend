import { useLoaderData } from "react-router";
import Task from "../components/Task.jsx";
export default function Project() {
  const { taskList, projectName } = useLoaderData();
  return (
    <>
    <p className="text-2xl mb-4">{projectName}</p>
      <div className="flex flex-col gap-4">
        {taskList?.map((item) => (
          <Task key={item.id} taskObject={item} />
        ))}
      </div>
    </>
  );
}
