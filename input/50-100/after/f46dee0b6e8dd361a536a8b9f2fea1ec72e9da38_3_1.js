function leave (req,res)
{
    try{
        var peer = req.body;
        peer[tableProperties.PEERS_STATUS] = tableProperties.PEERS_DISCONNECTED;
        dao.updatePeerStatusById(peer, function(newPeerInfo){

            if(newPeerInfo == null || typeof newPeerInfo == 'undefined'){
                res.send(errCodes.ERR_PEER_NOT_SPECIFIED, 400);
            } else {
                res.send("Success", 200);
            }
        });
    }catch(err){
        res.send(errCodes.ERR_CODE_400, 400);
    }
}