function(test){
    test.expect(4);
    $test.Context.init(function(db){
        db.Items.add(new $test.Item({ Key: 'aaa1', Value: 'bbb6', Rank: 1 }));
        db.Items.add(new $test.Item({ Key: 'aaa2', Value: 'bbb7', Rank: 2 }));
        db.Items.add(new $test.Item({ Key: 'bbb3', Value: 'bbb8', Rank: 3 }));
        db.Items.add(new $test.Item({ Key: 'aaa4', Value: 'bbb9', Rank: 4 }));
        db.Items.add(new $test.Item({ Key: 'aaa5', Value: 'bbb0', Rank: 5 }));
        db.saveChanges(function(cnt){
            test.equal(cnt, 5, 'Not 5 items added to collection');
            db.Items.toArray(function(data){
                test.equal(data.length, 5, 'Not 5 items selected from collection');
                test.ok(data[0] instanceof $test.Item, 'Entity is not an Item');
                for (var i = 0; i < data.length; i++){
                    db.Items.remove(data[i]);
                }
                db.saveChanges(function(cnt){
                    test.equal(cnt, 5, 'Not 5 items removed from collection');
                    test.done();
                })
            });
        });
    });
}