function(id, comment, callback) {
    if (imgRegex.test(id)) {
        var that  = this;
        this.getCollection(function(error, collection) {
            that.fetch(id, function(error, target) {
                if (target !== null) {
                    comment.i = target.i;
                    comment.r = 0;
                    collection.update({ a: target.a }, {$inc : { i : 1}, $push : { c : comment }}, {safe:true}, function(err, result) {
                        if( error ) callback(error)
                        else callback(null, result);
                    });
                } else { // Create new comment since one doesn't exist yet
                    comment.i = 0;
                    comment.r = 0;
                    var target = {
                        a: id,
                        i: 1,
                        c: [comment]
                    }
                    collection.insert(target, {safe:true}, function(err, result) {
                        if( error ) callback(error)
                        else callback(null, result);
                    });
                }
            });
        });
    } else {
        callback("Invalid Image");
    }
}