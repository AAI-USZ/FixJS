function (nodeName, redisHost, redisPort, shardId,descriptionFolder) {
    console.log("Starting adaptor " + nodeName);
    thisAdaptor = new AdaptorBase(nodeName);
    redisClient = redis.createClient(redisPort, redisHost);
    pubsubRedisClient = redis.createClient(redisPort, redisHost);
    thisAdaptor.instanceUID = "UID:" + Date.now() + Math.random() + Math.random() + Math.random();

    thisAdaptor.compiledSwarmingDescriptions = [];
    thisAdaptor.msgCounter = 0;
    pubsubRedisClient.subscribe(shardId+nodeName);
    thisAdaptor.redisHost = redisHost;
    thisAdaptor.redisPort = redisPort;
    thisAdaptor.shardId   = shardId;

    thisAdaptor.connectedOutlets = {};
    addGlobalErrorHandler();

    var cleanMessage = {
        scope:"broadcast",
        type:"start",
        nodeName:nodeName,
        instanceUID:thisAdaptor.instanceUID
    }

    // handle messages from redis
    pubsubRedisClient.on("message", function (channel, message) {
        //continue swarmingPhase
        var initVars = JSON.parse(message);
        if (initVars.scope == "broadcast") {
            onBroadcast(initVars);
        }
        else {
            onMessageFromQueue(initVars, message);
        }
    });

    if (nodeName == "Core") {
        uploadDescriptions(descriptionsFolder);
    }
    loadSwarmingCode();
    return thisAdaptor;
}