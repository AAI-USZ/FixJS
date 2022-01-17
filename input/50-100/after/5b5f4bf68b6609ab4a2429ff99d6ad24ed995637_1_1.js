function(req, res,next){
                       console.log("reguest for deleteAllNodes");
                        db.deleteAllNodes(function (err, result) {
                                            if (err){
                                                console.log("in error handler");

                                                return next(err);

                                            }
                                            console.log("created");
                                            res.end('done');
                            }
                                           );
}