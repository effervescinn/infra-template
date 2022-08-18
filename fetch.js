import fetch from 'node-fetch'

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
    method: "POST",
    headers: {
        Authorization:
            "OAuth ##", // тут будет токен
        "X-Org-ID": "##", // тут будет id
    },
    body: JSON.stringify({ text: "Тестовый комментарий" }),
}).then((res) => {
    console.log(res);
});
