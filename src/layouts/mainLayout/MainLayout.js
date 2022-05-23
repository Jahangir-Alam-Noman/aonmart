import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SidebarMenu from "../../components/productSidebar/SidebarMenu";
import './MainLayout.css'
import FloatingCartButton from "../../components/cart/FloatingCartButton";
import FloatingCart from "../../components/cart/FloatingCart";
import ScrollToTop from "react-scroll-to-top";

 
const MainLayout = ({ children, title, description }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    document.title = typeof title !== "undefined" && title !== null ? `Aonmart Grocery Shop || ${title}` : "Aonmart Grocery Shop"

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className={`page-layout ${isMenuOpen === true ? "open-side-menu" : ""}`}>
                <div className={isMenuOpen === true ? "toggledMenu" : "isNotToggledMenu"}>
                    {/* <ProductSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
                    <SidebarMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
                <div className={isMenuOpen === true ? "toggledBody section-ptb" : "isNotToggledBody section-ptb"}>
                    {children}
                </div>
                <Footer />
                <FloatingCart />
                <FloatingCartButton />
            </div>
            <ScrollToTop smooth />

        </>
    );
};

export default MainLayout;
