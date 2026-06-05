import { Toast } from "@heroui/react";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import useTheme from "../hooks/useTheme.jsx";
import { LayoutSideContent } from "@gravity-ui/icons";
export default function Home() {
  useTheme();
  const [toggleSidebar, setToggleSidebar] = useState(true);
  return (
    <>
      <div className="fixed top-5 left-5">
        {" "}
        {toggleSidebar || (
          <LayoutSideContent
            onClick={() => setToggleSidebar(!toggleSidebar)}
            className="size-6"
          />
        )}
      </div>
      <div className={`flex w-full`}>
        <div
          className={`${toggleSidebar ? "w-95 fixed md:static" : "w-0"} transition-[width] duration-500 ease-in-out overflow-hidden grow-0
        `}
        >
          <Sidebar
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar}
          />
        </div>
        <div
          className={`p-12 grow h-screen overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
      <Toast.Provider />
    </>
  );
}
