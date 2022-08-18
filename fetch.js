import fetch from 'node-fetch'

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47/comments", {
    method: "POST",
    headers: {
        Authorization:
            "OAuth y0_AgAAAAAu4UNlAAhVwQAAAADMjPMRHBbJVEMcRbiDSieL_EO-CqmLO1w",
        "X-Org-ID": "7261414",
    },
    body: JSON.stringify({ text: "Тестовый комментарий" }),
}).then((res) => {
    console.log(res);
});
