function(){
		var liCurrent = $("li.current");
		
		$('a', '#toolbox').live('click', function(){
			var that = $(this),
			field = that.attr('data-field');
			
			addField(field, sliderio.view.toolbox.currentIndex());
			initSlider();
		});
		
		$('textarea', liCurrent).live('change cut paste drop keydown', function(){
				var self = this;
				setTimeout(function(){
					self.style.height = 'auto';
					self.style.height = self.scrollHeight + 'px';
				}, 0);
		});
			
		$('.sliderWrapper').live('click', function(){
			$('.editorField.selected').removeClass('selected');
		});
			
		$('.editorField', liCurrent).live('click', function(e){
			$('.editorField.selected').removeClass('selected');
			$(this).addClass('selected');
			
			e.stopPropagation();
		});
			
		$('textarea.newListItem', liCurrent).live('click', function(){
			var li = $(this).parent('li');
			
			var newItem = $("<li>");
			newItem
				.addClass('editorField')
				.css('display','list-item')
				.append('<textarea>')
				.append("<a href='#' class='remove'>x</a>");
				
			newItem.insertBefore(li);
			$('textarea', newItem).attr('rows', 1).css('height', '1em').focus();
		});
		
		$('textarea', liCurrent).live('change', function(){
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		});
		
		$('textarea', liCurrent).live('blur', function(){
			var txt = $(this),
				span = txt.prev('span');
				
			span.text(txt.val()).show();
			txt.hide();
		});
		
		$('span', 'li.current').live('dblclick', function(){
			$(this).hide().nextAll('textarea').show().attr('rows', 1).css('height', '1em').focus();
		});
		
		$('a.remove', liCurrent).live('click', function(){
			$(this).parent('.editorField').remove();
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		});
		
		$('.fTextAlign a', liCurrent).live('click', function(){
			var ele = $(this).parents('.editorField');
			$('span', ele).css('text-align', $(this).attr('data-align'));
			$('textarea', ele).css('text-align', $(this).attr('data-align'));
			$('.fTextAlign a.selected', ele).removeClass('selected');
			$(this).addClass('selected');
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		});
		
		/*
		 * isChapter
		 */
		
		$('a.chapter-field', liCurrent).live('click', function(){
			var $this = $(this),
				idx = sliderio.view.toolbox.currentIndex();
				
			if ($this.attr('data-chapter') == "true"){
				slides[idx].isChapter = false;
				$this.removeClass('icon-bookmark').addClass('icon-bookmark-empty');
			}
			else {
				slides[idx].isChapter = true;
				$this.removeClass('icon-bookmark-empty').addClass('icon-bookmark');
			}
			
			saveSlides(function(){
				initSlider();
			});
		});
		
		/*
		 * Image Editor
		 */
		
		$('.editor-image', liCurrent).live('mouseenter', function(){
			$('.imageOptions' ,this).show();
		}).live('mouseleave', function(){
			$('.imageOptions' ,this).hide();
		});
		
		$('.editor-image li a.edit-resource', liCurrent).live('click', function(){
			var currRes,
				ele = $(this),
				_file = ele.attr('data-field-url');
				
			if (_file){
				currRes = {
					url: 'images/' + _file,
					file: _file
				};
			}
			
			sliderio.view.resources.show(function(resource){
				var img = ele.parents('div.editor-image').children('img.field'); 
				
				ele.attr('data-field-url', resource.file);
				img.attr('data-field-url', resource.file);
				img.attr('src', 'images/' + resource.file);
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}, currRes);	
		});
		
		var resizeImage = function(ele, size){
			var img = ele.parents('div.editor-image').children('img.field');
			img.attr('data-field-size', size)
				.attr('class', size + ' field');
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		};
		
		$('.editor-image li a.edit-small', liCurrent).live('click', function(){
			resizeImage($(this), 'small');
		});
		
		$('.editor-image li a.edit-normal', liCurrent).live('click', function(){
			resizeImage($(this), 'normal');
		});
		
		$('.editor-image li a.edit-big', liCurrent).live('click', function(){
			resizeImage($(this), 'big');
		});
	}