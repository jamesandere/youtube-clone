import styled from "styled-components";
import Videos from "./Videos";
import { useState, useEffect } from "react";
import { fetchData } from "../features/api";
import axios from "axios";
import { mobile, tablet } from "../responsive";

const Feed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  //   const fetchVideos = async () => {
  //     const response = await fetchData(`trending`);
  //     setVideos(response.data);
  //   };

  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/trending",
      params: {
        geo: "US",
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
      },
    };

    const res = await axios.request(options);
    setVideos(res?.data.data);
  };

  return <Container>{videos && <Videos videos={videos} />}</Container>;
};

export default Feed;

const Container = styled.div`
  min-height: 70vh;
  width: 100%;
  padding: 12px 20px;

  ${tablet({
    padding: "4px 0px",
  })}
`;
