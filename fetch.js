import fetch from "node-fetch";

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
    method: "POST",
    headers: {
        Authorization: `OAuth ${process.env.authToken}`,
        "X-Org-ID": `${process.env.id}`,
    },
    body: JSON.stringify({ text: "Тестовый комментарий" }),
});
