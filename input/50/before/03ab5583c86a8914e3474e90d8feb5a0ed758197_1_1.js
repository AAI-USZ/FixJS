function(req, res, next, cid){
  if( chconf(req.params.cid) ){
    next();
  }else{
    res.json({
      error: "Channel Not Found",
      reason: "The specified channel is not registered in this server. Try GET /channels/ to check registered."
    }, 404);
  }
}