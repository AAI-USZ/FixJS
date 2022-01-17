function(req, res){
    var payload =  {uri: req.params[0],
                    comments: true,
                    stats: true,
                    summary: true,
                    tags: true};
    //res.send(JSON.stringify(payload));
    res.send(JSON.stringify(payload), {'Content-Disposition': filename});
    diffbot.article(payload, function(err, response) {
        var filename = new Date() + response.title +"\".json";
        //console.log(response.title);
        fs.writeFile(DATA_DIRECTORY + filename, JSON.stringify(response), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    });
}