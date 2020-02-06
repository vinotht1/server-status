const axios = require("axios");

module.exports.findServer = (serverUrl) => {
    apiRequest = value => {
        return new Promise(function (resolve, reject) {
            axios
                .get(value.url, { timeout: 50000 })
                .then(data => {
                    if (data.status >= 200 || data.status <= 299) resolve(value);
                })
                .catch(err => {
                    reject({ error: "server offline" });
                });
        }).catch(function (err) {
            return err;
        });
    };

    const urlPromises = serverUrl => {
        let i;
        let promises = [];
        for (i in serverUrl) {
            promises.push(apiRequest(serverUrl[i]));
        }
        Promise.all(promises)
            .then(results => {
                const onlineServers = results.filter(eachresult => {
                    if (eachresult.url) {
                        return eachresult;
                    }
                });
                if (onlineServers.length)
                    console.log("Online Servers", onlineServers.reverse());
                else
                    console.log("All servers Are Offline")
            })
            .catch(e => {
                console.log("error", e);
            });
    };


    urlPromises(serverUrl)
}

