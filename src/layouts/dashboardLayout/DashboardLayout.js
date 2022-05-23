import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SidebarMenu from "../../components/productSidebar/SidebarMenu";
import "./DashboardLayout.css";
import FloatingCartButton from "../../components/cart/FloatingCartButton";
import FloatingCart from "../../components/cart/FloatingCart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserDataAction } from "../../components/_redux/getUserData/Action/UserDataAction";
import DashboardSidebar from "./../../components/dashboard/dashboardSIdebar/DashboardSidebar";
import DashboardCover from "../../components/dashboard/DashboardCover";

const DashboardLayout = ({ children, title, description }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDataReducer.userData);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  document.title =
    typeof title !== "undefined" && title !== null
      ? `Aonmart Grocery Shop || ${title}`
      : "Aonmart Grocery Shop";

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div
        className={`page-layout ${isMenuOpen === true ? "open-side-menu" : ""}`}
      >
        <div
          className={isMenuOpen === true ? "toggledMenu" : "isNotToggledMenu"}
        >
          <SidebarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div
          className={
            isMenuOpen === true
              ? "toggledBody section-ptb"
              : "isNotToggledBody section-ptb"
          }
        >
          {/* <DashboardCover /> */}
          <div className="user_profile_container py-md-5 py-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <DashboardSidebar />
                </div>
                <div className="col-lg-9">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <FloatingCart />
        <FloatingCartButton />
      </div>
    </>
  );
};

export default DashboardLayout;
