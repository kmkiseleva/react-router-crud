const createRequest = async ({ id, payload, method }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const requestURL = method === "DELETE" ? baseURL + `${id}` : baseURL;
  const request = await fetch(requestURL, {
    method: method,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!request.ok) {
    throw new Error("Something went wrong");
  }

  const response = await request.json();
  return response;
};

export default createRequest;
