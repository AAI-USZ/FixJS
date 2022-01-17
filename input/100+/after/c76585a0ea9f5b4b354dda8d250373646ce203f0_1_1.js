function(){
                var form = new Element('form');
                form.set('html', '<select>\
                    <option value="">no value</option>\
					<option value="0">value 0</option>\
					<option value="1">value 1</option>\
					</select>');
                expect(form.getElement('select').set('value', 0).get('value')).toEqual('0');
            }