import { useState } from "react";
import styled from "styled-components";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Container>
      <p className="text">
        {isReadMore ? text?.slice(0, 200).concat("...") : text}
      </p>
      <button onClick={toggleReadMore}>
        {isReadMore ? " ...read more" : " Show less"}
      </button>
    </Container>
  );
};

export default ReadMore;

const Container = styled.div`
  button {
    color: #f1f1f1;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 6px 4px;
    font-weight: 600;
    margin-top: 4px;
  }
`;
