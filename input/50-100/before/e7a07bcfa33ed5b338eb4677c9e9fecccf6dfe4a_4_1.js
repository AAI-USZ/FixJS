function(){
			grid.showData(data);
			var height = 500;
			grid.set('height',height);
			expect(header.getColumnsWidth()).toBe(header.get('width') - 17);
		}