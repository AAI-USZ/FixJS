function(){
			var form = document.createElement('form');
			var select = document.createElement('select');
			var input = document.createElement('input');
			var button = document.createElement('button');
			var option = document.createElement('option');
			var markText = "with these words highlighted2";
			
			form.setAttribute('action', 'some/path');
			form.setAttribute('name', 'formName');
			form.target = '_blank';
			select.name = 'selectName';
			option.value = '1.value';
			button.setAttribute('type', 'submit');
			input.type = 'submit';
			
			form.innerHTML = '<article>This native javascript sentence is also in a green box <mark>'+markText+'</mark>?</article>';
			
			
			form.appendChild(select);
			form.appendChild(button);
			form.appendChild(input);
			
			
			
			if(select.add){
				try {
					select.add(option);
				} catch(er){
					select.appendChild(option);
				}
			} else {
				select.appendChild(option);
			}
			document.getElementById('qunit-fixture').appendChild(form);
			
			equals($('select option', form).val(), '1.value', "select has one option with value");
			equals($('article > mark', form).html(), markText, "innerHTML getter equals innerHTML setter");
			equals($('article', form).css('borderTopWidth'), '2px', "article has a 2px border");
		}