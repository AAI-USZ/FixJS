function(i){
			_.assertUndefined(indexing);
			indexing = i;
			handle.selectByMultiplePropertyConstraints = makeSelectByMultiplePropertyConstraints(indexing, handle);
		}