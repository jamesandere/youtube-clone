import styled from "styled-components";
import ChannelVideos from "../components/ChannelVideos";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ReadMore from "../components/ReadMore";
import { mobile, tablet } from "../responsive";

const Channel = () => {
  const [details, setDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  const [sortValue, setSortValue] = useState("newest");
  const location = useLocation();
  const path = location.search.split(/[=]/)[1];

  const fetchChannelDetails = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/channel",
      params: {
        id: path,
        sort_by: sortValue,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      setDetails(response.data);
      setVideos(response.data?.data);
    } catch (error) {
      console.error(error);
    }
  }, [path]);

  useEffect(() => {
    fetchChannelDetails();
  }, []);

  return (
    <Container>
      <About>
        <Thumbnail>
          <img
            src={
              details?.meta?.thumbnail[details?.meta?.thumbnail.length - 1].url
            }
            alt=""
          />
        </Thumbnail>
        <Details>
          <h1>{details.meta?.title}</h1>
          <div>
            <span>@{details.meta?.title}</span>
            <span>{details.meta?.subscriberCount} subscribers</span>
            {/* <span>331 videos</span> */}
          </div>
          <ReadMore>{details.meta?.description}</ReadMore>
        </Details>
      </About>
      <Filters>
        <button>Latest</button>
        <button>Popular</button>
        <button>Oldest</button>
      </Filters>
      <ChannelVideos videos={videos} />
    </Container>
  );
};

export default Channel;

const Container = styled.div`
  min-height: 100vh;
`;

const About = styled.div`
  padding: 0.5em;
  display: flex;

  ${tablet({
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 20px",
  })}
`;

const Thumbnail = styled.div`
  margin-right: 10px;

  img {
    border-radius: 50%;
    height: 176px;
    width: 176px;

    ${tablet({
      height: "100px",
      width: "100px",
    })}
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  ${tablet({
    alignItems: "center",
  })}

  h1 {
    margin-bottom: 10px;

    ${mobile({
      fontSize: "22px",
    })}
  }

  p {
    margin-top: 10px;
    width: 70%;

    ${tablet({
      width: "100%",
    })}
  }

  span {
    margin-right: 10px;
  }
`;

const Filters = styled.div`
  display: flex;

  ${tablet({
    padding: "2px 20px",
  })}

  button {
    &:first-child {
      background-color: var(--text-primary);
      color: #0f0f0f;
    }

    color: var(--text-primary);
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0 12px;
    margin: 12px;
    margin-left: 0;
    font-weight: 600;
    height: 32px;
    min-width: 12px;
    padding: 0 10px;
    border-radius: 8px;
    box-sizing: border-box;
    transition: all 0.5s ease;

    &:hover {
      background-color: #737373;
    }
  }
`;
