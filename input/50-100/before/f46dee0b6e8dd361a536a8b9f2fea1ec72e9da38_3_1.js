function(newPeerInfo){

            if(newPeerInfo == null || typeof newPeerInfo == 'undefined'){
                res.send(errCodes.ERR_PEER_NOT_SPECIFIED, 400);
            } else {
                res.send("Success", 200);
            }
        }