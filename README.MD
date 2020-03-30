# discord-build-scraper-js
A build scraper for Discord™'s three release channels; Canary, PTB (Public Test Build), and Stable accessible via public API endpoints.
The original was developed in Python by adityaxdiwakar/discord-build-scraper

## Purpose
Scrapes the `app.js` file for `discordapp.com/app`, `ptb.discordapp.com/app`, and `canary.discordapp.com/app` to detect the current build hash, id, and number.

## Requirements for usage
The first argument specifies what channel to parse. It accepts `stable`, `ptb` and `canary`.
The second argument defines a previous build id and will skip some requests if it stays the same. Then only `buildID` will be returned.

If the fetcher doesn't get passed arguments it will just fetch stable.

```JavaScript
const fetcher = require("discord-build-fetcher-js");

fetcher("ptb").then(result => {
    /*Example result
    {
        buildID: 'a6ccbca',
        buildNum: '56922',
        buildHash: 'a6ccbcac150f2eceb9fe8ad9e8a366de4619aa93',
        jsFiles: [
            '61b847639cb1da281ef0.js',
            'eb0e0686bdc747cdf121.js',
            'a994c9ec1230b4ca863f.js',
            '4877f4dd1bbc0f6f313b.js'
        ],
        cssFiles: [ 'ad723c4b2468a57440e3.css' ]
    }
    */
})
```