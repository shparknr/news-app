import axios from "axios";

const host = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.REACT_APP_API_KEY}`;

// export 필수.
export const getData = async ({ successFn, failFn, errorFn }) => {
  try {
    const response = await axios.get(`${host}`);
    console.log(response.data.articles);
    const status = response.status.toString();
    if (status.charAt() === "2") {
      successFn(response.data.articles);
    } else {
      failFn("뉴스 호출 오류");
    }
  } catch (error) {
    errorFn("서버 오류");
  }
};
