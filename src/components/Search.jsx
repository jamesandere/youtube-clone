import styled from "styled-components";
import Videos from "./Videos";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const path = location.search.split(/[=]/)[1];

  useEffect(() => {
    fetchVideos();
  }, [path]);

  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/search",
      params: {
        query: path,
        geo: "US",
        lang: "en",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      setVideos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Videos videos={videos} />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  min-height: 70vh;
  width: 100%;
  padding: 12px 20px;
`;
