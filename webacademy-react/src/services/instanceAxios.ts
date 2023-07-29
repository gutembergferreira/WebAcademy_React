import axios from "axios";

export const api = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (axios.isAxiosError(er)) {
      if (er.response) {
        if (er.response.status === 403) {
          localStorage.removeItem("persist:root");
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(er);
  }
);
