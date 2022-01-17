function(){

			it('should return `null` when the value of a input element is set to `undefined`', function(){
				var value;
				expect(new Element('input', {value: value}).get('value')).toEqual('');
			});

			it('should set a falsey value and not an empty string', function(){
				expect(new Element('input', {value: false}).get('value')).toEqual('false');
				expect(new Element('input', {value: 0}).get('value')).toEqual('0');
			});

		}