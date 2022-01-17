function( hasReadAuth ) {
    if ( hasReadAuth ) {
        print( "Checking read operations, should work" );
        assert.eq( 1000, testDB.foo.find().itcount() );
        assert.eq( 1000, testDB.foo.count() );
        assert.eq( null, testDB.runCommand({getlasterror : 1}).err );
        checkCommandSucceeded( testDB, {dbstats : 1} );
        checkCommandSucceeded( testDB, {collstats : 'foo'} );

        // inline map-reduce works read-only on non-sharded collections
        var res = checkCommandSucceeded( testDB, {mapreduce : 'bar', map : map, reduce : reduce,
                                                  out : {inline : 1}});
        assert.eq( 100, res.results.length );
        assert.eq( 45, res.results[0].value );

        res = checkCommandSucceeded( testDB,
                                     {aggregate:'foo',
                                      pipeline: [ {$project : {j : 1}},
                                                  {$group : {_id : 'j', sum : {$sum : '$j'}}}]} );
        assert.eq( 4500, res.result[0].sum );

        res = checkCommandSucceeded( testDB, { $eval : 'return db.bar.findOne();'} );
        assert.eq(str, res.retval.str);
    } else {
        print( "Checking read operations, should fail" );
        assert.throws( function() { testDB.foo.find().itcount(); } );
        assert.eq(0, testDB.runCommand({getlasterror : 1}).ok);
        checkCommandFailed( testDB, {dbstats : 1} );
        checkCommandFailed( testDB, {collstats : 'foo'} );
        checkCommandFailed( testDB, {mapreduce : 'foo', map : map, reduce : reduce,
                                     out : { inline : 1 }} );
        checkCommandFailed( testDB, {aggregate:'foo',
                                     pipeline: [ {$project : {j : 1}},
                                                 {$group : {_id : 'j', sum : {$sum : '$j'}}}]} );

        checkCommandFailed( testDB, { $eval : 'return db.bar.findOne();'} );
    }
}