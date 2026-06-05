import { Magnifier, TrashBin, CodeCompare } from "@gravity-ui/icons";
import { Kbd } from "@heroui/react";
import useSearch from "../hooks/useSearch";
import Task from "./Task.jsx";
import { Link } from "react-router";
export default function SearchBar() {
  const { searchQuery, searchedTaskList, searchedProjectList } = useSearch();
  return (
    <div className={"w-full"}>
      <div className="flex gap-1 border-b border-gray-300 p-2 ">
        <Magnifier className="size-5" />
        <input
          placeholder="Search"
          type="text"
          onChange={searchQuery}
          className="w-full appearance-none focus:outline-none"
        />
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {searchedTaskList?.map((item) => (
          <Task id={item.id} taskObject={item} />
        ))}
      </div>
      <div className="flex flex-col mt-2 gap-2 transition-all duration-300">
        {searchedProjectList?.map((item) => (
          <Link
            to={`/app/project/${item.id}`}
            key={item.id}
            className="w-full flex justify-between border p-2 items-center rounded-2xl"
          >
            {item.name}
            <CodeCompare className="size-6 text-blue-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}
