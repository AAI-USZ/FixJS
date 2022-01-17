function(test){
    test.expect(1);
    $test.Context.init(function(db){
        var add1 = new $test.Item({ Key: 'aaa1', Value: 'bbb6', Rank: 1 });
        var add2 = new $test.Item({ Key: 'aaa2', Value: 'bbb7', Rank: 2 });
        var add3 = new $test.Item({ Key: 'bbb3', Value: 'bbb8', Rank: 3 });
        var add4 = new $test.Item({ Key: 'aaa4', Value: 'bbb9', Rank: 4 });
        var add5 = new $test.Item({ Key: 'aaa5', Value: 'bbb0', Rank: 5 });
        
        db.Items.add(add1);
        db.Items.add(add2);
        db.Items.add(add3);
        db.Items.add(add4);
        db.Items.add(add5);
        
        db.saveChanges(function(cnt){
            test.equal(cnt, 5, 'Not 5 items added to collection');
            
            var add6 = new $test.Item({ Key: 'aaa6', Value: 'bbb-1', Rank: 6 });
            db.Items.add(add6);
            db.Items.remove(add1);
            
            db.saveChanges(function(cnt){
                test.done();
            });
        });
    });
}