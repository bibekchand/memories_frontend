import {
    CircleCheckFill,
    Clock,
    PencilToSquare,
    TrashBin,
} from "@gravity-ui/icons";
import { Chip, Popover } from "@heroui/react";
import { useState } from "react";
import useTasks from "../hooks/useTasks.jsx";
import TaskEdit from "./TaskEdit";
export default function Task({ taskObject }) {
    const [task, setTask] = useState(taskObject);
    const { deleteUserTask } = useTasks();
    return (
        <div className="w-full flex gap-2 border p-2 rounded-2xl items-center hover:text-[18px]  transition-all ease-in-out">
            <div className={`${task?.status === "completed" ? "line-through" : ""}`}>
                {task?.title}
            </div>
            <Chip color={task?.status == "completed" ? "success" : "warning"}>
                {task?.status === "completed" ? (
                    <>
                        <CircleCheckFill width={12} />
                        <Chip.Label>Completed</Chip.Label>
                    </>
                ) : (
                    <>
                        <Clock width={12} />
                        <Chip.Label>Pending</Chip.Label>
                    </>
                )}
            </Chip>
            <div className="ml-auto flex gap-5">
                <Popover>
                    <Popover.Trigger>
                        <button
                            type="button"
                            className="active:text-gray-400 hover:cursor-pointer"
                        >
                            <PencilToSquare className="size-6" />
                        </button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Popover.Dialog>
                            <TaskEdit task={task} setTask={setTask} />
                        </Popover.Dialog>
                    </Popover.Content>
                </Popover>
                <TrashBin
                    className="size-6 hover:cursor-pointer text-red-500"
                    onClick={() => {
                        deleteUserTask(task.id);
                    }}
                />
            </div>
        </div>
    );
}
