import styled from "@emotion/styled";
import React from "react";

const NewsItemStyle = styled.div`
  display: flex;
  gap: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;

  .thumbnail {
    img {
      display: block;
      width: 160px;
      height: 100px;
      // 원본 image를 줄였을때 이미지 왜곡을 어떻게 할건지.
      object-fit: cover;
    }
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
      margin: 0;
      a {
        color: #000;
      }
    }
    p {
      margin: 0;
      white-space: normal;
    }
  }
`;

// NewsList.js 에서 sampleArticle 객체를 받아옴.
const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt } = article;
  return (
    <NewsItemStyle>
      <div className="thumbnail">
        {/* 원본페이지 추적불가 속성 : rel="noopener noreferrer" */}
        <a href={url} target="blank" rel="noopener noreferrer">
          {/* poublic 폴더(루트폴더) 경로 지정 : `${process.env.PUBLIC_URL}  */}
          <img src={urlToImage} alt="썸네일" />
        </a>
      </div>
      <div className="contents">
        <h2>
          <a href={url} target="blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p>{description}</p>
        <p>{publishedAt}</p>
      </div>
    </NewsItemStyle>
  );
};

export default NewsItem;
