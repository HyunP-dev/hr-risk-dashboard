import { apiFetch } from "../utils/api";

export async function predictEmployee(data) {
  try {
    const response = await apiFetch("/api/analysis", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "직원 예측 요청 실패");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("predictEmployee 오류:", error);
    throw error; // 호출하는 곳에서 처리 가능
  }
}
