function( jStat ) {
			assert.deepEqual( jStat([[1,2],[1,4]]).mode(), [1,false]);
		}