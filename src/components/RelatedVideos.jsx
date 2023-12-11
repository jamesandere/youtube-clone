import axios from "axios";
import { abbreviateNumber } from "js-abbreviation-number";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

const RelatedVideos = ({ id }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/related",
      params: {
        id: id,
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
      {videos.map((video, i) => (
        <Link to={`/video/${video.videoId}`}>
          <Item key={id}>
            <div className="img-cont">
              <img
                src={video.thumbnail[video.thumbnail.length - 1]?.url}
                alt=""
              />
            </div>
            <div>
              <h2>{video.title.slice(0, 50).concat("...")}</h2>
              <span>{video.channelTitle}</span>
              <div>
                <span>{abbreviateNumber(video.viewCount, 1)} views</span>
                <span>{video.publishedTimeText}</span>
              </div>
            </div>
          </Item>
        </Link>
      ))}
    </Container>
  );
};

export default RelatedVideos;

const Container = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Item = styled.div`
  display: flex;
  margin-bottom: 12px;

  ${tablet({
    flexDirection: "column",
    marginBottom: "20px",
  })}

  div:first-child {
    margin-right: 8px;
    height: 110px;
    width: 200px;
    border-radius: 8px;
    flex: 1;

    ${tablet({
      width: "100%",
    })}

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  div:nth-child(2) {
    flex: 1;
    h2 {
      margin-bottom: 4px;
      font-size: 1rem;
      line-height: 1.4rem;
      font-weight: 500;
      overflow: hidden;

      ${tablet({
        flexDirection: "column",
      })}
    }
  }

  div:nth-child(2) {
    span {
      margin-right: 8px;
      font-size: 14px;
    }
  }
`;
