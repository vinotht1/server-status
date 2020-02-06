var application = require("../app")
var data = require("../data")

it('should return servers online offline status', function () {
    var online = application.findServer(data)
    console.log(online)
});

