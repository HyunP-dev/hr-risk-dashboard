import axios from "axios";

// 👉 이거 추가
const API_BASE_URL = "https://mini-team2-home-project.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL, // 👉 이 줄 활성화
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDashboardData = async (institutionName) => {
  try {
    let targetName = institutionName.replace(/㈜/g, "(주)").trim();
    let encodedName = encodeURIComponent(targetName);
    console.log("🚀 1차 시도 (일반 괄호):", targetName);

    try {
      const response = await api.get(`/api/dashboard/${encodedName}`);
      return response.data.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        const altName = institutionName.replace(/\(주\)/g, "㈜").trim();
        console.log("⚠️ 1차 실패, 2차 시도 (특수기호):", altName);

        const retryRes = await api.get(
          `/api/dashboard/${encodeURIComponent(altName)}`,
        );
        return retryRes.data.data;
      }
      throw err;
    }
  } catch (error) {
    console.error("대시보드 데이터 호출 최종 실패:", error);
    throw error;
  }
};
