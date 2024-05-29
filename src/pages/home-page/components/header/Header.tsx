import React from "react";
import TabBar from "./tab-bar/TabBar";
import logo from "../../../../assets/logo.png";
import icon from "../../../../assets/icon.jpg";
import { useTranslation } from "react-i18next";
import { StyledHeaderContainer } from "./HeaderContainer";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

const Header = () => {
  const { t } = useTranslation();

  const {profilePicture} = useSelector((state:RootState) => state.userInfo);


  return (
    <>
      <StyledHeaderContainer>
        <div className="title-container">
          <img src={profilePicture ?? icon} className="icon" alt="Icon" />
          <img src={logo} className="logo" alt="Logo" />
          <h5>{t("header.home")}</h5>
        </div>
        <TabBar />
      </StyledHeaderContainer>
    </>
  );
};

export default Header;
