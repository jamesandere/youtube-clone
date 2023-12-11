import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GoHomeFill, GoTrophy } from "react-icons/go";
import { BsFire } from "react-icons/bs";
import { PiMusicNoteLight } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaRegNewspaper, FaFilm } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { mobile, tablet } from "../responsive";

const LeftNav = () => {
  return (
    <Container>
      <NavLink to="/">
        <NavItem>
          <GoHomeFill />
          Home
        </NavItem>
      </NavLink>
      <NavLink>
        <NavItem to="/about">
          <BsFire />
          Trending
        </NavItem>
      </NavLink>
      <NavLink to="/live">
        <NavItem>
          <MdLiveTv />
          Live
        </NavItem>
      </NavLink>
      <NavLink to="/music">
        <NavItem>
          <PiMusicNoteLight />
          Music
        </NavItem>
      </NavLink>
      <NavLink to="/games">
        <NavItem>
          <IoGameControllerOutline />
          Gaming
        </NavItem>
      </NavLink>
      <NavLink to="/news">
        <NavItem>
          <FaRegNewspaper />
          News
        </NavItem>
      </NavLink>
      <NavLink to="/movies">
        <NavItem>
          <FaFilm />
          Films
        </NavItem>
      </NavLink>
      <NavLink to="/sports">
        <NavItem>
          <GoTrophy />
          Sports
        </NavItem>
      </NavLink>
    </Container>
  );
};

export default LeftNav;

const Container = styled.div`
  width: 260px;
  position: fixed;
  top: 56px;
  left: 0;
  min-height: 100vh;
  padding: 20px 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${tablet({
    position: "fixed",
    top: "56px",
    left: 0,
    width: "100vw",
    display: "flex",
    alignItems: "center",
    minHeight: "20px",
    height: "56px",
    overflowY: "scroll",
    backgroundColor: "#0f0f0f",
  })}

  a {
    text-decoration: none;
    color: inherit;

    /* &:first-child {
      ${tablet({
      backgroundColor: "#f1f1f1",
      color: "#0f0f0f",
    })}
    } */
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 12px 4px;
  font-size: 16px;
  margin-bottom: 10px;

  ${tablet({
    backgroundColor: "rgba(255,255,255,0.1)",
    height: "32px",
    minWidth: "12px",
    marginRight: "6px",
    padding: "0 10px",
    borderRadius: "8px",
    boxSizing: "border-box",
    outline: "none",
    overflow: "hidden",
    cursor: "pointer",
  })}

  svg {
    margin-right: 20px;
    font-size: 26px;
    ${tablet({
      display: "none",
    })}
  }
`;
