function (x) {
			if (x.status !== 200) {
				console.log('unable to load', self.filepath);
				return;
			}

			var ab = x.response;
			var header = structs.header.unpack(ab.slice(0, 262));
			var isTSF = header.version === 0x201;
			
			var streams = [];
			var offset = 262;

			for (var i = 0; i < 4; i++) {
				streams[i] = ab.slice(offset, header.streamSize[i][1] + offset);
				offset += header.streamSize[i][1];
			}

			
						
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