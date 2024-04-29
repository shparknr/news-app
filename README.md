# 프로젝트 생성

- `npx create-react-app ./`
- `npm i(install) normalize.css`
- `npm i @emotion/react`
- `npm i @emotion/styled`

- .prettierrc.json (파일 생성) 후 붙혀넣기

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

- `npm install eslint --dev`
- `npm install eslint-config-react-app --save-dev`
- `npx eslint --init`
- `npm install eslint-config-prettier --save-dev`

- .eslintrc.js 에 붙혀넣기

```js
extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
],
```

```js
rules: {
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "no-unused-vars": "off",
},
```

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "off",
  },
};
```

- `npm install @babel/plugin-proposal-private-property-in-object --dev`
- `npm install react-router-dom`

- APP.js 정리

```js
import "./App.css";

function App() {
  return (
    <div>
      <h1>뉴스 외부 API 연동</h1>
    </div>
  );
}

export default App;
```

- index.js 정리 후 `import "normalize.css";` , `import "./index.css";` (./index.css 단축키 alt + shift + O)

```js
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

- index.html 에서 en > ko 변경 title태그 내용 수정

- src/pages/NewsPages.js 파일생성

```js
import React from "react";
import NewsItem from "../components/NewsItem";

const NewsPage = () => {
  return (
    <div>
      <h2>뉴스 목록 페이지입니다.</h2>
    </div>
  );
};

export default NewsPage;
```

# Route

- index.js 에서 BrowserRouter 생성

```js
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

- APP.js 에 Routes 생성

```js
import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
```

# 컴포넌트 만들기

- src/components/NewsItem.js 생성

```js
import React from "react";

const NewsItem = () => {
  return (
    <div className="newsitem">
      <div className="thumbnail">
        <a>
          {/*  public 폴더 경로 ${process.env.PUBLIC_URL} */}
          <img src={`${process.env.PUBLIC_URL}/images/thumbnail.png`} />
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
```

- NewsPage.js에 NewsItem.js(components) 불러오기

```js
import React from "react";
import NewsItem from "../components/NewsItem";

const NewsPage = () => {
  return (
    <div>
      <h2>뉴스 목록 페이지입니다.</h2>
      <NewsItem />
    </div>
  );
};

export default NewsPage;
```

- 추가적으로 margin값,font 변경 (기본값적용) 을 위해 index.css 변경

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000000;
  text-decoration: none;
}
img {
  vertical-align: middle;
  border: 0;
}
html {
  font-size: 10px;
}
body {
  font-family: "Pretendard-Regular", sans-serif;
  font-size: 1rem;
  line-height: 1.25;
  letter-spacing: -0.23px;
  word-break: keep-all;
  color: #000000;
}
```

- src/components/NewsList.js 생성 : NewsItem이 담긴 컴포넌트
  - NewsItem.js

```js
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

const NewsItem = () => {
  return (
    <NewsItemStyle>
      <div className="thumbnail">
        {/* 원본페이지 추적불가 속성 : rel="noopener noreferrer" */}
        <a href="https://google.com" target="blank" rel="noopener noreferrer">
          {/* poublic 폴더 경로 지정 : `${process.env.PUBLIC_URL}  */}
          <img src={`${process.env.PUBLIC_URL}/images/thumbnail.png`} />
        </a>
      </div>
      <div className="contents">
        <h2>
          <a href="https://google.com" target="blank" rel="noopener noreferrer">
            뉴스 제목
          </a>
        </h2>
        <p>뉴스 내용</p>
        <p>날짜: 2024-04-25</p>
      </div>
    </NewsItemStyle>
  );
};

export default NewsItem;
```

    - NewsList.js

```js
import React from "react";
import NewsItem from "./NewsItem";
import styled from "@emotion/styled";

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

const NewsList = () => {
  return (
    <NewsListStyle>
      <NewsItem />
      <NewsItem />
      <NewsItem />
      <NewsItem />
      <NewsItem />
      <NewsItem />
    </NewsListStyle>
  );
};

export default NewsList;
```

# props를 사용해서 샘플 데이터 넘겨보기 (NewsList.js -> NewsItem.js)

- NewsList.js

```js
import React from "react";
import NewsItem from "./NewsItem";
import styled from "@emotion/styled";

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

// 초기 데이터 객체
const sampleArticle = {
  title: "제목",
  description: "내용",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160",
  publishedAt: "2024-04-26",
};

const NewsList = () => {
  return (
    <NewsListStyle>
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
      <NewsItem article={sampleArticle} />
    </NewsListStyle>
  );
};

export default NewsList;
```

- NewsItem.js

```js
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
```

# npm install axios

# NewsList.js에 NewsAPI데이터 넣기

- https://newsapi.org/s/south-korea-news-api

# NewsList 작업 , const [articles, setArticles] = useState(null);

- NewsList.js

```js
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import styled from "@emotion/styled";
import axios from "axios";

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

// 초기 데이터 객체
const sampleArticle = {
  title: "제목",
  description: "내용",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160",
  publishedAt: "2024-04-26",
};

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async/await를 사용하는 함수 따로 선언
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.REACT_APP_API_KEY}`,
        );
        // console.log(response.data);
        // articles에 객체담기
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    // 함수실행
    getData();
  }, []);

  // 아직 articles 값이 설정되지 않았을 때
  // map 함수를 사용하기 전에 해당 값이 null인지 검사
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
```

- NewsItem.js

```js
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
```

# NewsList 작업 , const [loading, setLoading] = useState(false);

```js
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import styled from "@emotion/styled";
import axios from "axios";

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

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async/await를 사용하는 함수 따로 선언
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.REACT_APP_API_KEY}`,
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
  }, []);

  if (loading) {
    return (
      <NewsListStyle>
        <h2>로딩중... 잠시만 기다려 주세요</h2>
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
```

# NewsList 로딩 중 // react-spinners 라이브러리 사용

- https://www.npmjs.com/package/react-spinners
- `npm i react-spinners`
- NewsItem.js

```js
if (loading) {
  return (
    <NewsListStyle>
      {/* react-spinner 사용 로딩효과 */}
      <BounceLoader
        color="#36d7b7"
        cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
      />
    </NewsListStyle>
  );
}
```

# Category 작업 start 1.

- Categories.js

```js
import React from "react";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "business", text: "비즈니스" },
  { name: "entertainment", text: "엔터네인먼트" },
  { name: "health", text: "건강" },
  { name: "science", text: "과학" },
  { name: "sports", text: "운동" },
  { name: "tachnology", text: "기술" },
];

const Categories = () => {
  return <div></div>;
};

export default Categories;
```

- NewsPage.js

```js
import React from "react";
import NewsList from "../components/NewsList";
import Categories from "../components/Categories";

const NewsPage = () => {
  return (
    <div>
      <h2>뉴스 목록 페이지입니다.</h2>
      <Categories />
      <NewsList />
    </div>
  );
};

export default NewsPage;
```

# Category 작업 start 2.

- Categories.js

```js
import React from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "business", text: "비즈니스" },
  { name: "entertainment", text: "엔터네인먼트" },
  { name: "health", text: "건강" },
  { name: "science", text: "과학" },
  { name: "sports", text: "운동" },
  { name: "tachnology", text: "기술" },
];

const Categories = () => {
  return (
    <div>
      <NavLink>{categories[0].text}</NavLink>
      <NavLink>{categories[1].text}</NavLink>
      <NavLink>{categories[2].text}</NavLink>
      <NavLink>{categories[3].text}</NavLink>
      <NavLink>{categories[4].text}</NavLink>
      <NavLink>{categories[5].text}</NavLink>
      <NavLink>{categories[6].text}</NavLink>
    </div>
  );
};

export default Categories;
```

- map 메서드 사용 - Categories.js

```js
import React from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "business", text: "비즈니스" },
  { name: "entertainment", text: "엔터네인먼트" },
  { name: "health", text: "건강" },
  { name: "science", text: "과학" },
  { name: "sports", text: "운동" },
  { name: "tachnology", text: "기술" },
];

const Categories = () => {
  return (
    <div>
      {categories.map(category => (
        <NavLink key={categories.name}>{category.text}</NavLink>
      ))}
    </div>
  );
};

export default Categories;
```

# Category 작업 start 3.

- Categories.js

```js
import React from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { name: "all", text: "전체보기" },
  { name: "business", text: "비즈니스" },
  { name: "entertainment", text: "엔터테인먼트" },
  { name: "health", text: "건강" },
  { name: "science", text: "과학" },
  { name: "sports", text: "스포츠" },
  { name: "technology", text: "기술" },
];

const Categories = () => {
  return (
    <div>
      {categories.map(categoty => (
        <NavLink
          key={categoty.name}
          to={categoty.name === "all" ? "/" : `/${categoty.name}`}
        >
          {categoty.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
```

- NewsList.js

```js
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
```

- NewsPage.js

```js
import React from "react";
import NewsList from "../components/NewsList";
import Categories from "../components/Categories";
import { useParams } from "react-router-dom";

const NewsPage = () => {
  const params = useParams();
  const category = params.category || "all";
  return (
    <div>
      <h2>뉴스 목록 페이지입니다.</h2>
      <Categories />
      <NewsList category={category} />
    </div>
  );
};

export default NewsPage;
```
