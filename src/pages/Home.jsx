import styled from "styled-components";
import LeftNav from "../components/LeftNav";
import Feed from "../components/Feed";
import { Outlet } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const Home = () => {
  return (
    <Main>
      <LeftNav />
      <Content>
        <Outlet />
      </Content>
    </Main>
  );
};

export default Home;

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  margin-top: 56px;

  ${tablet({
    width: "100vw",
    overflow: "hidden",
  })}
`;

const Content = styled.div`
  margin-left: 260px;
  width: 100%;

  ${tablet({
    marginLeft: 0,
    marginTop: "40px",
  })}
`;
