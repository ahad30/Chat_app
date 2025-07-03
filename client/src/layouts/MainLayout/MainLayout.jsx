import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="">
      <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
