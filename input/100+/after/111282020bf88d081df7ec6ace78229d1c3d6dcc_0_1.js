function() {
			var fakeResponse = function() {
				this.send = function(message) {
					assert.equal(message, 'Received player.');
				};
			};

			var fakeRequest = function() {
				this.body = { 'file_contents' : '' };
			};

			fs.writeFile = function(file, content, callback) { 
				assert.equal(file, 'newPlayer.zip');
				assert.equal(content, 'file_contents');
		
				callback();
			};
			
			new bot().upload(new fakeRequest(), new fakeResponse());
		}