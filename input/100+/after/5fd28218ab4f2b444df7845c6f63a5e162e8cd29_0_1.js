function( test_done ) {

        sql.open( conn_str, function( err, conn ) {

          async.series([
            function( async_done ) {
              conn.queryRaw( "drop table test_sql_no_data", function( err ) {
                async_done();
              });
            },
            function( async_done ) {
              conn.queryRaw( "create table test_sql_no_data (id int identity, name varchar(20))", function( err ) {
                assert.ifError( err );
                async_done();
              });
            },
            function( async_done ) {
              conn.queryRaw( "delete from test_sql_no_data where 1=0", function( err, results ) {

                assert.ifError( err );
                var expectedResults = { meta: null, rowcount: 0 }
                assert.deepEqual( results, expectedResults );
                async_done();
                test_done();
              });
            }
            ]);
        });
    }