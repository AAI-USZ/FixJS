function(move) {
        var jsonCard = move['card'];
        var seqNo = move['sequenceNumber'];
        var card = new Card(jsonCard['rank'], jsonCard['suit']);
        var player = game.getPlayerById(move['playerId']);
        
        moves.push(new PlayerMove(player, card, seqNo));
    }