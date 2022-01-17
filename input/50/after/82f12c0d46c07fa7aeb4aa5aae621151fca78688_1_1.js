function (err, result) {
                                            if (err){
                                                return next(err);

                                            }
                                            console.log("nodes deleted");
                                            res.end('TO DO change to JSON success response');
                            }