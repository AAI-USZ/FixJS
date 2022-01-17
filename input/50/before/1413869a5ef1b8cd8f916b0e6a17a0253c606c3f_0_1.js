function (id) {
        print ("cancelling " + id);
        if(ids[id]) {
          print ("found id");
          ids[id].cancel();
        }
        timer.purge();
        delete ids[id];
    }