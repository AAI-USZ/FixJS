function(req, res){
//TO make this all async
    csvMapper.parseFile();
    res.end('done');

}