function(){
			var fieldName = $(this).attr('data-field');
			var field = {};
			field[fieldName] = {};
			
			switch(fieldName) {
				case 'title':
				case 'subTitle':
					field[fieldName].text = $(this).val();
					var txtAlign = $(this).css('text-align');
					if (txtAlign){
						if (txtAlign === 'center' && field[fieldName].align)
							delete field[fieldName].align;
						else {
							field[fieldName].align = txtAlign;
						}
					}
					break;
				case 'list':
					field[fieldName].items = [];
					
					$('li textarea', $(this)).not('.newListItem').each(function(){
						field[fieldName].items.push($(this).val());
					});
					break;
				case 'image':
					field[fieldName].url = $(this).attr('data-field-url');
					field[fieldName].size = $(this).attr('data-field-size');
					break;
				case 'code':
					field[fieldName].language = 'javascript';
					field[fieldName].script = $(this).val();
					break;
				}
				
				var fl = $(this).parents('.editorField');
				if (fl.hasClass('absoluteField')){
					field[fieldName].style = field[fieldName].style || {};
					
					var calPos = {
						top: (fl.position().top * 100) / $("li.current").height(),
						left: (fl.position().left * 100) / $("li.current").width()
					};
					
					field[fieldName].style.position = calPos;
				}
				
				slides[idx].fields.push(field);
			}