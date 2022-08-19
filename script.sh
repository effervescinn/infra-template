#!/bin/bash

tagsCount=`git tag | wc -l`
tags=`git tag`
tagsArr=(${tags// / })

if [[ $tagsCount == "1" ]] 
then
  commitsInfo=`git log --pretty=format:"%h %an %s" ${tagsArr[${tagsCount} - 1]}`
else
  commitsInfo=`git log --pretty=format:"%h %an %s" ${tagsArr[${tagsCount} - 1]}...${tagsArr[${tagsCount} - 2]}`
fi

node fetch.js $commitsInfo ${tagsArr[${tagsCount} - 1]}
