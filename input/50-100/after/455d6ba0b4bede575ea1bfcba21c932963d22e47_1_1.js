function(req, res, next){
//TO make this all async
    csvMapper.parseFile( function (err, individuals) {
            if (err) return next(err);
            console.log('number of individuals ' +  individuals.length);
            individuals.forEach(function(item){
                        addIndividual(req,res,next,item);
                                })

            res.end('done');
                        }
            );

}