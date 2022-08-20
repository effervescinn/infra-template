#!/bin/bash

tagsCount=`git tag | wc -l`
tags=`git tag --sort=-creatordate`
tagsArr=(${tags// / })

if [[ $tagsCount == "1" ]] 
then
  commitsInfo=`git log --pretty=format:"%H %an %s" ${tagsArr[0]}`
else
  commitsInfo=`git log --pretty=tformat:"%H %an %s" ${tagsArr[0]}...${tagsArr[1]}`
fi

node setRelease.js "$commitsInfo" ${tagsArr[0]}

docker build . -t ${tagsArr[0]}

node comment.js ${tagsArr[0]}
