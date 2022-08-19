import fetch from "node-fetch";

function getReleaseInfo(commits, releaseTag) {
    const tagAuthor = commits.split(" ")[1];

    return { commits, tagAuthor, releaseTag: releaseTag.split("-")[1] };
}

function getDate() {
    const date = new Date();

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const { commits, tagAuthor, releaseTag } = getReleaseInfo(
    process.argv[2],
    process.argv[3]
);
const date = getDate();

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47", {
    method: "PATCH",
    headers: {
        Authorization: `OAuth ${process.env.authToken}`,
        "X-Org-ID": `${process.env.id}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        summary: `Релиз №${releaseTag} от ${date}`,
        description: `Ответственный за релиз: ${tagAuthor}
        
        Коммиты, попавшие в релиз:
        ${commits}`,
    }),
}).catch((err) => {
    console.error("Ошибка при выполнении запроса");
    throw err;
});
