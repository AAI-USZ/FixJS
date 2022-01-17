function(db){
    db.Items
        //.include('Things')
        .filter(function(it){ return it.Key == 'ccc'; })
        .filter(function(it){ return it.Rank > 100; })
        /*.orderBy('it.Key')
        .orderBy('it.Id')
        .orderByDescending('it.Value')
        .map('it.Rank')*/
        .take(1)
        .toArray(function(data){
            data.forEach(function(it){
                console.log(it.initData);
                db.Items.attach(it);
                it.Value = 'updated4';
            });
            
            //db.Items.add(new $test.Item({ Key: 'abc', Value: 'cba', Rank: 199 }));
            
            db.saveChanges(function(cnt){
                console.log('saveChanges', cnt);
            });
        });
}