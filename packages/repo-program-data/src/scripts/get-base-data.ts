import { writeFileSync } from "node:fs";
import type { CategoryDisplay } from "../lib";
import { Programs } from "../lib";
import { rawCategoryData, rawHiringForData } from "../lib/data/raw-data";

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

const writeCategories = () => {
  const p = Programs.instance;

  const cats = p
    .getCategories()
    .reduce<Record<string, CategoryDisplay>>((acc, cat) => {
      const { count, ...rest } = cat;
      acc[rest.slug] = rest;
      return acc;
    }, {});
  writeFileSync(
    "./categories.json",
    JSON.stringify({ ...cats, ...rawCategoryData }, null, 2)
  );
};

const writeHiringFor = () => {
  const p = Programs.instance;

  const hiringFors = p
    .getHiringFors()
    .reduce<Record<string, CategoryDisplay>>((acc, cat) => {
      const { count, ...rest } = cat;
      acc[rest.slug] = rest;
      return acc;
    }, {});
  writeFileSync(
    "./hiring-for.json",
    JSON.stringify(
      {
        ...hiringFors,
        ...rawHiringForData,
      },
      null,
      2
    )
  );
};

writeCategories();

writeHiringFor();
