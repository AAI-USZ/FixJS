function(e){
				var newInput = template.clone();
				var arrayI = newInput.get('name').match(/.+?\[(\d+)\].+/);
				if (arrayI && arrayI[1]) {
					current_nr += 1;
					newInput.set('name',
						newInput.get('name')
							.replace(/(.+?\[)\d+(\].+)/, '$1'+(parseInt(arrayI[1], 10)+current_nr)+'$2')
					);
				}
				newInput.inject(e.target, 'before');
			}