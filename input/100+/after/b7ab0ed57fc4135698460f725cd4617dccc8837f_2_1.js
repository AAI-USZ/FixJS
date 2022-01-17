function (data) {
			
			console.log('tileset download time:', (Date.now() - st)/1000+'s');
		
			self.emit('progress', 1);

			st = Date.now();
			var height = Math.ceil(data.info.tileCount/10);
			self.image.height = self.mask.height = height*32;

			var tileCount = data.info.tileCount;

			var imgdata = self.imgc.createImageData(32, 32);
			var imgd = imgdata.data;
			var tilecache = [];
			
			var i, j, x, y, tile, index, color, pos, cachepos, masked, mbyte, pixpos;
			
			for (i = 0; i < tileCount; i++) {
				tile = data.info.imageAddress[i]/1024;
				if (tile === 0) {
					continue;
				}
				pos = [i % 10, Math.floor(i / 10)];
				if (tilecache[tile] !== undefined) {
					cachepos = [tilecache[tile] % 10, Math.floor(tilecache[tile] / 10)];
					self.imgc.drawImage(self.image, cachepos[0]*32, cachepos[1]*32, 32, 32, pos[0]*32, pos[1]*32, 32, 32);
				} else {
					tilecache[tile] = i;
					for (j = 0; j < 4096 /* 32x32x4 */; j+=4) {

						index = data.images[tile][j/4];
						if (index > 1) {
							color = data.info.palette[index];
							imgd[j + 0] = color & 0xFF;
							imgd[j + 1] = (color >> 8) & 0xFF;
							imgd[j + 2] = (color >> 16) & 0xFF;
							imgd[j + 3] = 255;
						} else {
							imgd[j + 3] = 0;
						}
					}
					self.imgc.putImageData(imgdata, pos[0]*32, pos[1]*32);
				}
			}
			self.image.classList.remove('hide');
			self.mask.classList.remove('hide');
			console.log('tileset render time:', (Date.now() - st)/1000+'s');

		}