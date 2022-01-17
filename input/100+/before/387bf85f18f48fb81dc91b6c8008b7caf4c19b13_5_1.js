function (err, docs) {
        console.log("err : ", err);
        console.log("docs : ", docs);
        //eventsManager.emit('getUsers::response', docs);
        callback(err, docs);
    }