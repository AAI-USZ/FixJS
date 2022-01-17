function (nodeName) {
    console.log("Starting adaptor " + nodeName);
    thisAdaptor = new AdaptorBase(nodeName);

    var basePath = process.env.SWARM_PATH;
    if(process.env.SWARM_PATH == undefined){
        console.log("Please set SWARM_PATH variable to your installation folder");
        process.exit(-1);
    }

    util.addGlobalErrorHandler();

    var basicConfigFile             = basePath + "/etc/config";
    thisAdaptor.config              = util.readConfig(basicConfigFile);
    thisAdaptor.redisHost           = thisAdaptor.config.Core.redisHost;
    thisAdaptor.redisPort           = thisAdaptor.config.Core.redisPort;
    thisAdaptor.coreId              = thisAdaptor.config.Core.coreId;

    redisClient             = redis.createClient(thisAdaptor.redisPort, thisAdaptor.redisHost);
    pubsubRedisClient       = redis.createClient(thisAdaptor.redisPort, thisAdaptor.redisHost);


    thisAdaptor.compiledSwarmingDescriptions    = [];
    thisAdaptor.connectedOutlets                ={};

    thisAdaptor.msgCounter                      = 0;

    var channel = thisAdaptor.coreId + nodeName;
    dprint("Subscribing to channel " + channel );
    pubsubRedisClient.subscribe(channel);


    // handle messages from redis
    pubsubRedisClient.on("message", function (channel, message) {
        //continue swarmingPhase
        var initVars = JSON.parse(message);
        onMessageFromQueue(initVars, message);
    });

    if (nodeName == "Core") {
        uploadDescriptions(basePath + "/" + thisAdaptor.config.Core.swarmsfolder);
    }
    loadSwarmingCode();
    return thisAdaptor;
}