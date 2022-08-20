import fetch from "node-fetch";

const releaseTag = process.env.argv[2];

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
    method: "POST",
    headers: {
        Authorization: `OAuth ${process.env.authToken}`,
        "X-Org-ID": `${process.env.id}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: `Собрали образ с тегом ${releaseTag}` }),
}).catch((err) => {
    console.error("Ошибка при выполнении запроса");
    throw err;
});
