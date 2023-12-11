import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mobile, tablet } from "../responsive";
import { IoPersonSharp } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const saveSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" || event === "searchButton") {
      navigate({
        pathname: "/search",
        search: `?=${searchValue}`,
      });
      setSearchValue("");
    }
  };

  return (
    <Container>
      <Start>
        <Link to="/">
          <div className="logo">
            <img src="https://i.ibb.co/s9Qys2j/logo.png" alt="" />
          </div>
        </Link>
      </Start>
      <Center>
        <SearchBox>
          <input
            type="text"
            value={searchValue}
            onKeyUp={handleSearch}
            onChange={saveSearch}
            placeholder="Search"
          />
        </SearchBox>
        <SearchButton onClick={() => handleSearch("searchButton")}>
          <IoIosSearch />
        </SearchButton>
      </Center>
      <End>
        <div className="avatar">
          <IoPersonSharp />
        </div>
      </End>
      <img class="menu-open" src="images/icon-hamburger.svg" alt="" />
      <img class="menu-close" src="images/icon-close.svg" alt="" />
      <div class="backdrop"></div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  height: 56px;
  width: 100%;
  padding: 0 16px;
  background-color: #212121;
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: fixed;
  top: 0;
  left: 0;

  .menu-open,
  .menu-close,
  .backdrop {
    display: none;
  }

  ${tablet({
    width: "100vw",
  })}

  ${mobile({
    width: "100%",
  })}
`;

const Start = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  ${mobile({})}

  .logo img {
    height: 42px;
    width: 42px;

    ${mobile({
      height: "32px",
      width: "32px",
    })}
  }

  a {
    text-decoration: none;
  }
`;

const Center = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  ${tablet({
    flex: 4,
  })}
`;

const SearchBox = styled.div`
  height: 40px;
  width: 100%;
  border: 2px solid hsla(0, 0%, 53.3%, 0.4);
  border-radius: 40px 0 0 40px;
  position: relative;
  display: flex;
  color: hsla(0, 100%, 100%, 0.88);
  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0 10px;
    font-size: 14px;
    color: hsla(0, 100%, 100%, 0.88);
  }
`;

const SearchButton = styled.div`
  background-color: transparent;
  border-radius: 0px 40px 40px 0px;
  padding: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  cursor: pointer;
  background-color: hsla(0, 0%, 100%, 0.08);
  /* border: 1px solid hsla(0, 0%, 53.3%, 0.4); */
`;

const End = styled.div`
  flex: 2;
  display: flex;
  align-items: center;

  ${tablet({
    flex: "1",
  })}

  .avatar {
    height: 42px;
    width: 42px;
    margin: 0 8px;
    margin-left: auto;
    margin-right: 0;
    display: flex;
    align-items: center;

    ${mobile({
      height: "32px",
      width: "32px",
    })}

    svg {
      height: 30px;
      width: 30px;
    }
  }
`;
