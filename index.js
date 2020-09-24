const axios = require("axios");

const channels = ['canary', 'ptb', 'stable'];

function fetcher(channel = 'stable', oldBuildID = -1) {
    if(!channels.includes(channel)) throw new Error("Given channel does not exist!");

    return new Promise((resolve, reject) => {
        let mainurl;
        if(channel == 'stable') mainurl = 'https://discordapp.com/app';
        else mainurl = `https://${channel}.discordapp.com/app`;
        
        axios.get(mainurl).then(mainres => {
            let buildID = mainres.headers["x-build-id"];

            if(oldBuildID !== -1 && oldBuildID == buildID) resolve({buildID: oldBuildID});

            let jsfiles = mainres.data.match(/([a-zA-z0-9]+)\.js/g);

            let sourceurl;
            if(channel == 'stable') sourceurl = `https://discordapp.com/assets/${jsfiles[jsfiles.length-1]}`;
            else sourceurl = `https://${channel}.discordapp.com/assets/${jsfiles[jsfiles.length-1]}`;

            axios.get(sourceurl).then(sourceres => {
                buildstrings = sourceres.data.match(/Build Number: [0-9]+, Version Hash: [A-Za-z0-9]+/g)[0].replace(' ', '').split(',');

                resolve(
                    {
                        buildID: mainres.headers["x-build-id"],
                        buildNum: buildstrings[0].split(':')[buildstrings[0].split(':').length-1].replace(' ', ''),
                        buildHash: buildstrings[1].split(':')[buildstrings[1].split(':').length-1].replace(' ', ''),
                        jsFiles: jsfiles,
                        cssFiles: mainres.data.match(/([a-zA-z0-9]+)\.css/g)
                    }
                );
            })
            .catch(reject);
        })
        .catch(reject);
    })
}

module.exports = fetcher;