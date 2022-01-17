function uploadDescriptions (descriptionsFolder){
    var files = fs.readdirSync(descriptionsFolder);

    files.forEach(function (fileName, index, array){
        var fullFileName = descriptionsFolder+"\\"+fileName;

        dprint("Uploading swarming:" + fileName);

        var content = fs.readFileSync(fullFileName);
        redisClient.hset(mkUri("system","code"), fileName,content);

    });
}