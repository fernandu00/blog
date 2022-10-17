import { Outlet } from "react-router-dom";
import { useGlobalContext } from "./context";
import Topbar from "./Topbar";

const SharedLayout = () => {
  const { auth } = useGlobalContext();
  return (
    <>
      <Topbar auth={auth} />
      <Outlet />
    </>
  );
};
export default SharedLayout;
