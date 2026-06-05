import {
    ChevronDownWide,
    ChevronRight,
    Ellipsis,
    LayoutSideContent,
    Moon,
    Plus,
    Sun,
    TrashBin,
    Bell,
} from "@gravity-ui/icons";
import {
    Avatar,
    Badge,
    Dropdown,
    Label,
    Modal,
    Popover,
    Switch,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import AddIcon from "../assests/add.svg?react";
import catImage from "../assests/cato.avif";
import InboxIcon from "../assests/inbox.svg?react";
import NotificationIcon from "../assests/notification.svg?react";
import SearchIcon from "../assests/SearchIcon.svg?react";
import useProjects from "../hooks/useProjects.jsx";
import { useThemeStore } from "../store/useThemeStore.jsx";
import AddProjects from "./AddProjects.jsx";
import ProfileCard from "./ProfileCard.jsx";
import SearchBar from "./SearchBar.jsx";
import TaskBar from "./TaskBar.jsx";
import useUserInfoStore from "../store/useUserInfoStore.jsx";
import { useLoaderData } from "react-router";

export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const username = useUserInfoStore((state) => state.username);
    const theme = useThemeStore((state) => state.theme);
    const [toggleProjectsList, setToggleProjectsList] = useState(true);
    const [size, setSize] = useState("sm");
    const { projectList, addProject, deleteProject } = useProjects();
    const { pendingTaskCount } = useLoaderData();

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth >= 1024) {
                setSize("lg");
            } else if (window.innerWidth >= 768) {
                setSize("md");
            } else {
                setSize("sm");
            }
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);
    return (
        <>
            {toggleSidebar && (
                <button
                    type="button"
                    className="fixed z-0 md:hidden bg-gray-500 opacity-20 h-screen w-screen ease-in-out transition-all"
                    onClick={() => setToggleSidebar(false)}
                ></button>
            )}
            <div
                className={`h-screen overflow-scroll shadow-[1px_10px_10px_black] dark:shadow-[1px_10px_10px_rgba(255,255,255,0.3)] rounded-2xl flex p-2 flex-col gap-5 w-fit bg-background opacity-90 md:opacity-100`}
            >
                <div className="flex items-center gap-5">
                    <Popover>
                        <Popover.Trigger>
                            <div className="flex rounded-[5px] items-center gap-2 p-2 hover:bg-gray-500 duration-200 ease-in-out cursor-pointer">
                                <Badge.Anchor>
                                    <Avatar>
                                        <Avatar.Image src={catImage} />
                                        <Avatar.Fallback>JD</Avatar.Fallback>
                                    </Avatar>
                                    <Badge color="danger" size="sm">
                                        {pendingTaskCount}
                                    </Badge>
                                </Badge.Anchor>
                                <span>{username}</span>
                                <ChevronDownWide />
                            </div>
                        </Popover.Trigger>
                        <Popover.Content className="max-w-64">
                            <Popover.Dialog>
                                <ProfileCard />
                            </Popover.Dialog>
                        </Popover.Content>
                    </Popover>
                    <Bell className="hover:fill-gray-300 dark:fill-white  dark:hover:fill-gray-300 size-6 duration-100 ease-in-out cursor-pointer" />

                    <Switch
                        isSelected={theme === "light"}
                        size={size}
                        onChange={toggleTheme}
                    >
                        <Switch.Control>
                            <Switch.Thumb>
                                <Switch.Icon>
                                    {theme === "light" ? (
                                        <Sun className="size-3 text-inherit opacity-100" />
                                    ) : (
                                        <Moon className="size-3 text-inherit opacity-70" />
                                    )}
                                </Switch.Icon>
                            </Switch.Thumb>
                        </Switch.Control>
                    </Switch>
                    <LayoutSideContent
                        onClick={() => {
                            setToggleSidebar(!toggleSidebar);
                        }}
                        className="size-6 cursor-pointer"
                    />
                </div>
                <div>
                    <ul>
                        <li className="active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer dark:hover:bg-gray-500  hover:bg-gray-200 duration-200 ease-in-out p-2">
                            <Modal>
                                <Modal.Trigger className="flex gap-2">
                                    <AddIcon className="fill-blue-500" />
                                    <span>Add Task</span>
                                </Modal.Trigger>
                                <Modal.Backdrop variant="transparent">
                                    <Modal.Container placement="center" size={size}>
                                        <Modal.Dialog className="w-fit">
                                            <Modal.CloseTrigger />
                                            <Modal.Body>
                                                <TaskBar />
                                            </Modal.Body>
                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                            </Modal>
                        </li>
                        <li className="active:bg-amber-300  rounded-[5px] flex gap-2 justify-start cursor-pointer dark:hover:bg-gray-500 hover:bg-gray-200 duration-200 ease-in-out p-2">
                            <Modal>
                                <Modal.Trigger className="flex gap-2">
                                    <SearchIcon className="fill-blue-500" />
                                    <span>Search</span>
                                </Modal.Trigger>
                                <Modal.Backdrop variant="transparent">
                                    <Modal.Container size={size} placement="center">
                                        <Modal.Dialog className="w-fit">
                                            <Modal.Body className="p-0">
                                                <SearchBar />
                                            </Modal.Body>
                                        </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                            </Modal>
                        </li>

                        <Link to="/app/inbox">
                            {" "}
                            <li className="active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500 duration-200 ease-in-out p-2">
                                <InboxIcon className="fill-blue-500" />
                                Inbox
                            </li>
                        </Link>

                        <li className=" mt-3 dark:hover:bg-gray-500 active:bg-amber-300 rounded-[5px] flex gap-2 justify-start cursor-pointer hover:bg-gray-200 duration-200 ease-in-out p-2">
                            My Projects
                            <div className="ml-auto rounded-[5px] mr-2 text-2xl hover:bg-gray-600 pl-1 pr-1 pt-1 pb">
                                <Modal>
                                    <Modal.Trigger className="flex">
                                        <Plus />
                                    </Modal.Trigger>
                                    <Modal.Backdrop variant="transparent">
                                        <Modal.Container size={size} placement="center">
                                            <Modal.Dialog>
                                                <Modal.Body className="p-2">
                                                    <AddProjects addProject={addProject} />
                                                </Modal.Body>
                                            </Modal.Dialog>
                                        </Modal.Container>
                                    </Modal.Backdrop>
                                </Modal>
                            </div>
                            <button
                                type="button"
                                onClick={() => setToggleProjectsList(!toggleProjectsList)}
                                className={`${toggleProjectsList ? "rotate-90" : ""} text-2xl rounded-[5px] hover:bg-gray-500 pl-2 pr-2 ease-in-out duration-200`}
                            >
                                <ChevronRight />
                            </button>
                        </li>
                    </ul>
                    <div
                        className={`${toggleProjectsList ? "max-h-full" : "max-h-0"} overflow-hidden duration-200 ease-in-out`}
                    >
                        <ul>
                            {projectList.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center hover:bg-gray-600 dark:hover:bg-gray-500 pl-2 rounded-[5px] p-2 cursor-pointer"
                                    >
                                        <Link to={`project/${item.id}`}>
                                            <span className="text-purple-600">#</span> {item.name}
                                        </Link>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <Ellipsis />
                                            </Dropdown.Trigger>
                                            <Dropdown.Popover>
                                                <Dropdown.Menu
                                                    onAction={(key) => {
                                                        if (key === "delete-project")
                                                            deleteProject(item.id);
                                                    }}
                                                >
                                                    <Dropdown.Item
                                                        id="delete-project"
                                                        textValue="Delete file"
                                                        variant="danger"
                                                    >
                                                        <TrashBin className="size-4 shrink-0 text-danger" />
                                                        <Label>Delete Project</Label>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
