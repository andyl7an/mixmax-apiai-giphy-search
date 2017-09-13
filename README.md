# Giphy Slash Command for Mixmax with Natural Language Processing

This is a proof of concept project built on top of the open source Mixmax Slash Command. See <http://developer.mixmax.com/docs/overview-slash-commands#tutorial-building-mygiphy> 

## Natural Language Demo
You can use natural language to limit the number of results...

![Alt Text](https://github.com/andyl7an/mixmax-apiai-giphy-search/blob/master/gifs/ResultLimiting.gif)

or to view all the currently trending gifs...

![Alt Text](https://github.com/andyl7an/mixmax-apiai-giphy-search/blob/master/gifs/Trending.gif)

or to filter your results to stickers...

![Alt Text](https://github.com/andyl7an/mixmax-apiai-giphy-search/blob/master/gifs/Stickers.gif)


## Prerequisites

To deploy this bot, you will need to have an [API.AI account](https://console.api.ai/) 
in addition to a [Mixmax developer account](https://developer.mixmax.com/)

## Setting up Api.ai

1. Go to your [API.AI console](https://console.api.ai/) 
2. Create a new agent
3. Go to your agent's settings
4. Click on the "Export and Import" Tab
5. Select "Import from zip"
6. Select the zip file "MixmaxIntegraton.zip" from this repository

## Running locally

1. Install using `npm install`
2. Run using `npm start`
