import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import styled from "@emotion/styled";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const NewsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  width: 768px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// 초기 데이터 객체 (sample)
const sampleArticle = {
  title: "제목",
  description: "내용",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160",
  publishedAt: "2024-04-26",
};

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async/await를 사용하는 함수 따로 선언
    const getData = async () => {
      setLoading(true);
      try {
        // 카테고리가 전체보기면 링크에 아무것도 넣지않고 아니면 해당카테고리가 링크에 삽입된다.
        const query = category === "all" ? "" : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${process.env.REACT_APP_API_KEY}`,
        );
        // console.log(response.data);
        // articles에 객체담기
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    // 함수실행
    getData();
  }, [category]); // category 넣으면 새로고침 안해도됨

  if (loading) {
    return (
      <NewsListStyle>
        {/* react-spinner 사용 로딩효과 */}
        <BounceLoader
          color="#36d7b7"
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          size={100}
        />
      </NewsListStyle>
    );
  }

  // 아직 articles 값이 설정되지 않았을 때
  // map 함수를 사용하기 전에 해당 값이 null인지 검사 (map매서드에 필요한코드)
  if (!articles) {
    return null;
  }

  return (
    <NewsListStyle>
      {articles.map(article => (
        // key 작성 필요.
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListStyle>
  );
};

export default NewsList;
