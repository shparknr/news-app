import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <Routes>
      {/*  / : 루트  최상위 index를 말함 */}
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
