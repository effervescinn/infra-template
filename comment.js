import fetch from "node-fetch";

console.log("Отправка запроса на комментарий...");

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
  method: "POST",
  headers: {
    Authorization: `OAuth ${process.env.authToken}`,
    "X-Org-ID": `${process.env.id}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: `Собрали образ с тегом ${process.env.tag}` }),
}).then(() => {
  console.log("Комментарий о сборке релиза добавлен в тикет")
}).catch((err) => {
  console.error("Ошибка при выполнении запроса");
  throw err;
});
