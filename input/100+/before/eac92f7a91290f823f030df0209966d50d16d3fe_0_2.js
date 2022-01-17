function( hasWriteAuth ) {
    if ( hasWriteAuth ) {
        print( "Checking write operations, should work" );
        testDB.foo.insert({a : 1, i : 1, j : 1});
        res = checkCommandSucceeded( testDB, { findAndModify: "foo", query: {a:1, i:1, j:1},
                                               update: {$set: {b:1}}});
        assert.eq(1, res.value.a);
        assert.eq(null, res.value.b);
        assert.eq(1, testDB.foo.findOne({a:1}).b);
        testDB.foo.remove({a : 1});
        assert.eq( null, testDB.runCommand({getlasterror : 1}).err );
        checkCommandSucceeded( testDB, {reIndex:'foo'} );
        checkCommandSucceeded( testDB, {repairDatabase : 1} );
        // Test both inline and regular map-reduce
        var res = checkCommandSucceeded( testDB, {mapreduce : 'foo', map : map, reduce : reduce,
                                                  out : {inline : 1}});
        assert.eq( 100, res.results.length );
        assert.eq( 45, res.results[0].value );
        checkCommandSucceeded( testDB, {mapreduce : 'foo', map : map, reduce : reduce,
                                        out : 'mrOutput'} );
        assert.eq( 100, testDB.mrOutput.count() );
        assert.eq( 45, testDB.mrOutput.findOne().value );

        checkCommandSucceeded( testDB, {drop : 'foo'} );
        assert.eq( 0, testDB.foo.count() );
        testDB.foo.insert({a:1});
        assert.eq( 1, testDB.foo.count() );
        checkCommandSucceeded( testDB, {dropDatabase : 1} );
        assert.eq( 0, testDB.foo.count() );
        checkCommandSucceeded( testDB, {create : 'baz'} );
        checkCommandSucceeded( testDB, { $eval : 'db.baz.insert({a:1});'} );
        assert.eq(1, testDB.baz.findOne().a);
    } else {
        print( "Checking write operations, should fail" );
        testDB.foo.insert({a : 1, i : 1, j : 1});
        assert.eq(0, testDB.runCommand({getlasterror:1}).err.indexOf('unauthorized') );
        checkCommandFailed( testDB, { findAndModify: "foo", query: {a:1, i:1, j:1},
                                      update: {$set: {b:1}}} );
        checkCommandFailed( testDB, {reIndex:'foo'} );
        checkCommandFailed( testDB, {repairDatabase : 1} );
        // Test both inline and regular map-reduce.  Inline MR on sharded collections requires write access.
        checkCommandFailed( testDB, {mapreduce : 'foo', map : map, reduce : reduce,
                                     out : {inline : 1}} );
        checkCommandFailed( testDB, {mapreduce : 'foo', map : map, reduce : reduce,
                                     out : 'mrOutput'} );
        checkCommandFailed( testDB, {drop : 'foo'} );
        checkCommandFailed( testDB, {dropDatabase : 1} );
        passed = true;
        try {
            // For some reason when create fails it throws an exception instead of just returning ok:0
            res = testDB.runCommand( {create : 'baz'} );
            if ( !res.ok ) {
                passed = false;
            }
        } catch (e) {
            // expected
            printjson(e);
            passed = false;
        }
        assert( !passed );
        var res = testDB.runCommand( { $eval : 'db.baz.insert({a:1});'} );
        printjson( res );
        // If you have read-only auth and try to do a $eval that writes, the $eval command succeeds,
        // but the write fails
        assert( !res.ok || testDB.baz.count() == 0 );
    }
}