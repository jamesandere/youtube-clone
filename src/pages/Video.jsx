import { useEffect, useState, useCallback } from "react";
import ReactPlayer from "react-player/youtube";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { abbreviateNumber } from "js-abbreviation-number";
import ReadMore from "../components/ReadMore";
import moment from "moment";
import RelatedVideos from "../components/RelatedVideos";
import { mobile, tablet } from "../responsive";

const Video = () => {
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});
  const [channelId, setChannelId] = useState(null);
  const { id } = useParams();

  const fetchVideo = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/video",
      params: { id: id },
      headers: {
        "X-RapidAPI-Key": "8b8d1e4b18msh7c9a37403c226d7p14c1aajsn1fddc6fc71db",
        "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setVideo(response.data);
      setChannelId(response.data.channelId);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const fetchChannel = useCallback(async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v3-alternative.p.rapidapi.com/channel",
      params: {
        id: channelId,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      setChannel(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [channelId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchVideo();
      await fetchChannel();
    };

    setTimeout(() => {
      fetchData();
    }, 300);
  }, [id, fetchChannel, fetchVideo]);

  return (
    <Container>
      <Wrapper>
        <First>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            playing={false}
            width={"100%"}
            height={"480px"}
            style={{
              borderRadius: "5px",
            }}
          />
          <Metadata>
            <h1>{video.title}</h1>
            <Row>
              <TopRow>
                <Owner>
                  <img
                    src={
                      channel.meta?.thumbnail[
                        channel.meta?.thumbnail.length - 1
                      ]?.url
                    }
                    alt=""
                  />
                  <div className="channel-info">
                    <Link to={`/channel?=${video.channelId}`}>
                      <h2>
                        {video.channelTitle}
                        <FaCheckCircle />
                      </h2>
                    </Link>
                    <span>{channel.meta?.subscriberCount} subscribers</span>
                  </div>
                </Owner>
              </TopRow>
            </Row>
            <Description>
              <div>
                <span>{abbreviateNumber(video.viewCount, 1)} views</span>
                <span>{moment(video.uploadDate).fromNow()}</span>
              </div>
              <ReadMore>{video.description}</ReadMore>
            </Description>
          </Metadata>
        </First>
        <Second>
          <RelatedVideos id={id} />
        </Second>
      </Wrapper>
    </Container>
  );
};

export default Video;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  margin-top: 56px;
  padding: 0px 20px;

  ${tablet({
    flexDirection: "column",
  })}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  ${tablet({
    flexDirection: "column",
  })}
`;

const First = styled.div`
  width: 100%;
  flex: 2;
  padding: 6px 12px;
`;

const Metadata = styled.div`
  padding: 10px 0;

  h1 {
    font-size: 1.4rem;
    line-height: 1.9rem;
    font-weight: 600;
    margin-bottom: 4px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  ${tablet({
    marginTop: "10px",
  })}
`;

const TopRow = styled.div`
  display: flex;
`;

const Owner = styled.div`
  display: flex;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .channel-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    a {
      text-decoration: none;
      color: inherit;
    }

    a:hover {
      text-decoration: underline #aaa;
      text-underline-offset: 3px;
    }

    h2 {
      font-size: 17px;
      display: flex;
      align-items: center;

      svg {
        margin-left: 4px;
        color: #aaa;
        height: 13px;
        width: 13px;
      }
    }

    span {
      color: #aaa;
      font-size: 14px;
    }
  }
`;

const Description = styled.div`
  background-color: #3f3f3f;
  border-radius: 10px;
  padding: 10px 16px;
  margin-top: 10px;

  div:first-child {
    span {
      font-weight: 600;
      font-size: 15px;
      margin-right: 8px;
    }
  }

  p {
    font-size: 15px;
    line-height: 22px;
  }
`;

const Second = styled.div`
  width: 100%;
  flex: 1;
  padding: 12px 10px;
`;
