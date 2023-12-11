import styled from "styled-components";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { mobile, tablet } from "../responsive";

const ChannelVideos = ({ videos }) => {
  return (
    <Container>
      {videos?.map((c, i) => (
        <Link to={`/video/${c.videoId}`}>
          <Card>
            <Thumbnail>
              <img src={c.thumbnail[c.thumbnail.length - 1].url} alt="" />
            </Thumbnail>
            <Details>
              <h3>{c.title}</h3>
              <div>
                <span>{abbreviateNumber(c.viewCount)} views</span>
                <span>{c.publishedText}</span>
              </div>
            </Details>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default ChannelVideos;

const Container = styled.div`
  width: 100%;
  padding-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 14px;
  padding-right: 20px;

  ${tablet({
    gridTemplateColumns: "1fr 1fr",
    paddingRight: "0",
    padding: "12px 20px",
  })}

  ${mobile({
    gridTemplateColumns: "1fr",
  })}

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Card = styled.div`
  /* min-width: 310px; */
  max-width: 500px;
  padding: 6px 0;
`;

const Thumbnail = styled.div`
  border-radius: 12px;
  margin-bottom: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const Details = styled.div`
  h3 {
    margin: 12px 0 4px 0;
    color: var(--text-primary);
    font-size: 15px;
    font-weight: 500;
  }

  div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      font-size: 0.9rem;
      margin-right: 10px;
      color: #aaa;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
