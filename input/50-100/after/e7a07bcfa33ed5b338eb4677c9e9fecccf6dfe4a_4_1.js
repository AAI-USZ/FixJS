function(){
			grid.showData(data);
			var height = 500;
			grid.set('height',height);
			expect(header.getColumnsWidth()).toBe(header.get('width') - 17);
            grid.set('forceFit',false);
            grid.set('width',300);
            waits(100);
            runs(function(){
                grid.set('width',800);
            });
             
		}