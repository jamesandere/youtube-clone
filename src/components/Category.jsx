import { useEffect, useState } from "react";
import styled from "styled-components";
import Products from "./Videos";
import axios from "axios";
import Videos from "./Videos";
import { useLocation } from "react-router-dom";

const Category = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  useEffect(() => {
    fetchVideos();
  }, [path]);

  const fetchVideos = async () => {
    if (path === "live") {
      const options = {
        method: "GET",
        url: "https://youtube-v3-alternative.p.rapidapi.com/search",
        params: {
          query: "all",
          geo: "US",
          lang: "en",
          features: "Live",
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
    } else {
      const options = {
        method: "GET",
        url: "https://youtube-v3-alternative.p.rapidapi.com/trending",
        params: {
          geo: "US",
          type: path,
          lang: "en",
        },
        headers: {
          "X-RapidAPI-Key":
            "8b8d1e4b18msh7c9a37403c226d7p14c1aajsn1fddc6fc71db",
          "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
        },
      };

      const res = await axios.request(options);
      setVideos(res?.data.data);
    }
  };

  return (
    <Container>
      <Videos videos={videos} />
    </Container>
  );
};

export default Category;

const Container = styled.div``;
