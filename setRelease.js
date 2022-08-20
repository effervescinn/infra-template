import fetch from "node-fetch";

function getDate() {
  const date = new Date();

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const commits = process.argv[2];
const author = process.env.author;
const releaseTag = process.env.tag.split("-")[1];
const date = getDate();

console.log('Отправка запроса на изменение тикета...')

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47", {
  method: "PATCH",
  headers: {
    Authorization: `OAuth ${process.env.authToken}`,
    "X-Org-ID": `${process.env.id}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    summary: `Релиз №${releaseTag} от ${date}`,
    description: `Ответственный за релиз: ${author}
    
    Коммиты, попавшие в релиз:
    ${commits}`,
  }),
}).then(() => {
  console.log("Информация о релизе добавлена в тикет");
}).catch((err) => {
  console.error("Ошибка при выполнении запроса");
  throw err;
});
