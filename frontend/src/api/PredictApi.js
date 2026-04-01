export async function predictEmployee(data) {
  const response = await fetch(
    "https://mini-team2-home-project.onrender.com/api/analysis",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  console.log("response", response);

  return response.json();
}
