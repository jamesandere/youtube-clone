import styled from "styled-components";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useNavigate } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const Videos = ({ videos }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {videos?.map((video, i) => (
        <Link to={`/video/${video.videoId}`}>
          <Card key={i}>
            <Thumbnail>
              <img
                src={video.thumbnail[video.thumbnail.length - 1]?.url}
                alt=""
              />
            </Thumbnail>
            <Details>
              <div className="channel-avi">
                <img
                  src={video.channelThumbnail && video.channelThumbnail[0]?.url}
                  alt=""
                />
              </div>
              <div className="video-deets">
                <h3>{video.title}</h3>
                <Link to={`/channel?=${video.channelId}`}>
                  <h4>{video.channelTitle}</h4>
                </Link>
                <div>
                  <span>
                    {video.viewCount &&
                      `${abbreviateNumber(video.viewCount, 0)} views`}
                  </span>
                  <span>{video.publishedText}</span>
                </div>
              </div>
            </Details>
          </Card>
        </Link>
      ))}
    </Container>
  );
};

export default Videos;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px 12px;

  ${tablet({
    gridTemplateColumns: "1fr 1fr",
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
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.div`
  border-radius: 12px;
  margin-bottom: 10px;
  height: 180px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const Details = styled.div`
  display: flex;

  .channel-avi {
    height: 44px;
    width: 44px;
    border-radius: 50%;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .video-deets {
    width: 100%;

    a:hover {
      text-decoration: underline #aaa;
      text-underline-offset: 3px;
    }

    h3 {
      font-weight: 500;
      font-size: 1.1rem;
      margin-bottom: 4px;
    }

    h4 {
      font-weight: 500;
      color: #aaa;
      z-index: 99;
    }

    div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      span {
        font-size: 1rem;
        margin-right: 10px;
        color: #aaa;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
