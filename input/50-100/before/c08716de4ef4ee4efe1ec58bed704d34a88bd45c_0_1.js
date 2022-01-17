function (fileName, index, array){
        var fullFileName = descriptionsFolder+"\\"+fileName;

        printDebugMessages("Uploading swarming:" + fileName);

        var content = fs.readFileSync(fullFileName);
        //console.log(this);
        redisClient.hset(thisAdaptor.mkUri("system","code"), fileName,content);

    }