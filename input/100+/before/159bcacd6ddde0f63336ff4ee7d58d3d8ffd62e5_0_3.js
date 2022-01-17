function(e){

        var paginator = this,
            host = paginator._host,
            index = paginator._cIndex,
            maxScrollY = paginator.cards[index].maxScrollY;

        // Set the max height base can scroll to
        host._maxScrollY = maxScrollY;
    }