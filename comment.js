import fetch from "node-fetch";

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
  method: "POST",
  headers: {
    Authorization: `OAuth ${process.env.authToken}`,
    "X-Org-ID": `${process.env.id}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: `Собрали образ с тегом ${process.env.tag}` }),
}).catch((err) => {
  console.error("Ошибка при выполнении запроса");
  throw err;
});
