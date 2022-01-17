function (id) {
        if(ids[id]) {
          ids[id].cancel();
        }
        timer.purge();
        delete ids[id];
    }