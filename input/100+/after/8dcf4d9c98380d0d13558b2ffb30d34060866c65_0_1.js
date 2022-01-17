function(error, target) {
                if (target !== null) {
                    comment.i = target.i;
                    comment.r = 0;
                    var keywords = keywordify(comment.m, target.k);
                    keywords = notIn(keywords, target.k);
                    collection.update({ a: target.a }, {$inc : { i : 1}, $push : { c : comment }, $pushAll : {k : keywords}}, {safe:true}, function(err, result) {
                        if( error ) callback(error)
                        else callback(null, result);
                    });
                } else { // Create new comment since one doesn't exist yet
                    comment.i = 0;
                    comment.r = 0;
                    var target = {
                        a: id,
                        i: 1,
                        k: keywordify(comment.m, []),
                        c: [comment]
                    }
                    collection.insert(target, {safe:true}, function(err, result) {
                        if( error ) callback(error)
                        else callback(null, result);
                    });
                }
            }