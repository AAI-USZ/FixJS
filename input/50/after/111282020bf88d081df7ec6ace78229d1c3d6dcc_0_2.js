function(file, content, callback) { 
				assert.equal(file, 'newPlayer.zip');
				assert.equal(content, 'file_contents');
		
				callback();
			}