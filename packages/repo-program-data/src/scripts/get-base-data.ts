import { writeFileSync } from "node:fs";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const requestOptions: RequestInit = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://v1.nocodeapi.com/alexwine36/google_sheets/nVElHRQBldESELOS?tabId=ALL",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => {
    writeFileSync("./data.json", result);
    // console.log(result);
  })
  .catch((_error) => {
    // console.log("error", error);
  });
