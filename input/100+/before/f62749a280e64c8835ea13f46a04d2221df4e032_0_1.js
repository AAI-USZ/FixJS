function(){
			var fieldName = $(this).attr('data-field');
			var field = {};
			field[fieldName] = {};
			field[fieldName].style = field[fieldName].style || {};
			
			var ele = $(this).parents('.editorField');
			
			switch(fieldName) {
				case 'title':
				case 'subTitle':
					field[fieldName].text = $(this).val();
					var txtAlign = ele.css('text-align');
					if (txtAlign){
						if (txtAlign === 'center' && field[fieldName].style.align)
							delete field[fieldName].style.align;
						else field[fieldName].style.align = txtAlign;
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
				
				if (ele.hasClass('absoluteField')){
					field[fieldName].style.position = {
						top: (ele.position().top * 100) / $("li.current").height(),
						left: (ele.position().left * 100) / $("li.current").width()
					};
				}
				else {
					if(field[fieldName].style) 
						delete field[fieldName].style.position;
				}
				
				var newW = (ele.width() * 100) / $("li.current").width();
				
				//there is a problem with height == 100%, so ... TBD
				//var newH = (ele.height * 100) / $("li.current").height();
				
				field[fieldName].style.size = {
					width: (newW <= 100)? newW : 100
					//height: (newH <= 100)? newH : 100
				};
				
				slides[idx].fields.push(field);
			}