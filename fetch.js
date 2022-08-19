import fetch from "node-fetch";

function getCommitsInfo(commitsInfo) {
    const commits = [];
    const tagAuthor = commitsInfo[1];

    for (let i = 0; i < commitsInfo.length; i += 3) {
        const commit = `${commitsInfo[i]} ${commitsInfo[i + 1]} ${
            commitsInfo[i + 2]
        }`;
        commits.push(commit);
    }

    const commitsStr = commits.join("\n");

    return { commits: commitsStr, tagAuthor };
}

function getDate() {
    const date = new Date();

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const commitsInfo = getCommitsInfo(
    process.argv.slice(2, process.argv.length - 1)
);
const releaseNum = process.argv[process.argv.length - 1].split("-")[1];
const date = getDate();

fetch("https://api.tracker.yandex.net/v2/issues/INFRA-47", {
    method: "PATCH",
    headers: {
        Authorization: `OAuth ${process.env.authToken}`,
        "X-Org-ID": `${process.env.id}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        summary: `Релиз №${releaseNum} от ${date}`,
        description: `Ответственный за релиз: ${commitsInfo.tagAuthor}
        
        Коммиты, попавшие в релиз:
        ${commitsInfo.commits}`,
    }),
});
