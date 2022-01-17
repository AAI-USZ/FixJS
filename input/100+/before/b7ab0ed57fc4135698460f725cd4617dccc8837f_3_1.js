function (x) {
			if (x.status !== 200) {
				console.log('unable to load', self.filepath);
				return;
			}

			var ab = x.response;
			var header = structs.header.unpack(ab.slice(0, 262));
			var isTSF = header.version === 0x201;
			
			var streams = [];
			var progress = [0, 0, 0, 0];
			var offset = 262;
			var loaded = 0;

			for (var i = 0; i < 4; i++) {
				self.requests.push(zlib.inflate(ab.slice(offset, header.streamSize[i][0] + offset), inflateCallback(i), inflateProgressCallback(i)));
				offset += header.streamSize[i][0];
			}

			function inflateProgressCallback(i) {
				return function (loaded, total) {
					progress[i] = loaded/header.streamSize[i][1];
					var avg = (progress[0]+progress[1]+progress[2]+progress[3])/4;
					//console.log('zlib', Math.round(avg*100)+'%');
					self.emit('progress', 0.5+(avg)/2);
				};
			};

			function inflateCallback(s) {
				return function (data) {

					streams[s] = data;

					loaded++;
					if (loaded === 4) {
						
						self.requests = [];

						var info = (!isTSF? structs.info1024 : structs.info4096).unpack(streams[0]);
						
						var images = new Array(streams[1].byteLength/1024);
						for (var i = 0; i < images.length; i++) {
							images[i] = new Uint8Array(streams[1].slice(i*1024, i*1024+1024));
						}
						

						var masks = new Array(streams[3].byteLength/128);
						for (var i = 0; i < masks.length; i++) {
							masks[i] = new Uint32Array(streams[3].slice(i*128, i*128+128));
						}
						
						
						parseCallback({
							header: header,
							info: info,
							images: images,
							masks: masks,
							maxTiles: !isTSF? 1024 : 4096
						});
					}
				};
			};
			
		}