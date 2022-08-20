#!/bin/bash

tagsCount=`git tag | wc -l`
tags=`git tag --sort=-creatordate`
tagsArr=(${tags// / })

echo "Getting info about commits..."
if [[ $tagsCount == "1" ]] 
then
  commitsInfo=`git log --pretty=format:"%H %an %s" ${tagsArr[0]}`
else
  commitsInfo=`git log --pretty=tformat:"%H %an %s" ${tagsArr[0]}...${tagsArr[1]}`
fi

node setRelease.js "$commitsInfo"

# docker build . -t $tag

node comment.js
