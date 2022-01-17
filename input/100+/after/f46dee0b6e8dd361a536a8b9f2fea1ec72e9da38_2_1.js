function updatePeerStatusById(peerInfo, callback){
    if (peerInfo[tableProperties.PEERS_ID] == null || typeof  peerInfo[tableProperties.PEERS_ID] == 'undefined' ||
        peerInfo[tableProperties.PEERS_STATUS] == null || typeof  peerInfo[tableProperties.PEERS_STATUS] == 'undefined'){
        callback(null);
    }else{
        client.executeUpdateSingleQuery('UPDATE ' + tableProperties.PEERS_TABLE + ' SET ' + tableProperties.PEERS_STATUS +
            ' = ? WHERE ' + tableProperties.PEERS_ID + ' = ?', [peerInfo[tableProperties.PEERS_STATUS],
            peerInfo[tableProperties.PEERS_ID]],
            function(err){
                callback(err);
            });
    }
}