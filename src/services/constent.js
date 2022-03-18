export const apiendpoint = "http://127.0.0.1:8000/api";
export const configure = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${localStorage.getItem("access")}`,
    Accept: "application/json",
  },
};
