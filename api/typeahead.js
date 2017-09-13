var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
CLIENT_ACCESS_TOKEN = 'fefc219756584e85a6e0278f7a97090e';
const apiaiApp = require('apiai')(CLIENT_ACCESS_TOKEN);


function searchGiphy(req, res, intent, endpoint){
    term = intent.result.parameters.gif_term;
    user_limit = intent.result.parameters.gif_limit;
    request({
        url: endpoint,
        qs: {
            q: term,
            limit: (user_limit != null) ? user_limit : 15,
            api_key: key
        },
        gzip: true,
        json: true,
        timeout: 10 * 1000
    }, function (err, response) {
        if (err || response.statusCode !== 200 || !response.body || !response.body.data) {
            res.status(500).send('Error');
            return;
        }
        var results = _.chain(response.body.data)
            .reject(function (image) {
                return !image || !image.images || !image.images.fixed_height_small;
            })
            .map(function (image) {
                return {
                    title: '<img style="height:75px" src="' + image.images.fixed_height_small.url + '">',
                    text: 'http://giphy.com/' + image.id
                };
            })
            .value();

        if (results.length === 0) {
            res.json([{
                title: '<i>(No results for that on Giphy)</i>',
                text: ''
            }]);
        } else {
            res.json(results);
        }
    });

}

// Intent detection
function dispatch(req, res, intent){
    intent_name = intent.result.metadata.intentName;
    if (intent_name == 'Search Giphy'){
        return searchGiphy(req, res, intent,'http://api.giphy.com/v1/gifs/search');
    }
    else if (intent_name == 'Search Giphy Trending'){
        return searchGiphy(req, res, intent, 'http://api.giphy.com/v1/gifs/trending');
    }
    else if (intent_name == 'Search Giphy Stickers'){
        return searchGiphy(req, res, intent, 'http://api.giphy.com/v1/stickers/search');
    }
    else if (intent_name == 'Search Giphy Translate'){
        return searchGiphy(req, res, intent, 'http://api.giphy.com//v1/stickers/translate');
    }

}
// The Type Ahead API.
module.exports = function (req, res) {
    var text = req.query.text.trim();
    if (!text) {
        res.json([{
            title: '<i>(Enter a Giphy Statement)</i>',
            text: ''
        }]);
        return;
    }

    var apiai = apiaiApp.textRequest(text, {
        sessionId: 'unique_id' // use any id
    });
    apiai.on('response', function (intent) {
        dispatch(req, res, intent);
    });
    apiai.on('error', function (error) {
        console.log(error)
    });

    apiai.end();

};