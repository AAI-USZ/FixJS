function(){
		var liCurrent = $("li.current");
		
		$('a', '#toolbox').live('click', function(){
			var that = $(this),
			field = that.attr('data-field');
			
			addField(field, sliderio.view.toolbox.currentIndex());
			initSlider();
		});
		
		$('textarea', $("li.current")).live('change cut paste drop keydown', function(){
				var self = this;
				setTimeout(function(){
					self.style.height = 'auto';
					self.style.height = self.scrollHeight + 'px';
				}, 0);
		});
		
		$('.sliderWrapper').live('click', function(){
			$('.editorField.selected').removeClass('selected').resizable('destroy');
		});
			
		$('.editorField', $("li.current")).live('click', function(e){
			
			$('.editorField.selected').removeClass('selected').resizable('destroy');
			
			var ele = $(this);
			if(!ele.hasClass('editor-image')){
				ele.addClass('selected').resizable({ 
					maxWidth: $("li.current").width() - (ele.position().left + 20),
					maxHeight: $("li.current").height() - (ele.position().top + 50),
					handles: 'e',
				  stop: function(event, ui) {
				  	hydrateSlide(sliderio.view.toolbox.currentIndex());
				  }
				});
			}
			
			e.stopPropagation();
		});
			
		$('textarea.newListItem', $("li.current")).live('click', function(){
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
		
		$('textarea', $("li.current")).live('change', function(){
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		});
		
		$('textarea', $("li.current")).live('blur', function(){
			var txt = $(this),
				span = txt.prev('span');
				
			span.text(txt.val()).show();
			txt.hide();
		});
		
		$('span', $("li.current")).live('dblclick', function(){
			$(this).hide().nextAll('textarea').show().attr('rows', 1).css('height', '1em').focus();
		});
		
		$('a.remove', $("li.current")).live('click', function(){
			$(this).parent('.editorField').remove();
			hydrateSlide(sliderio.view.toolbox.currentIndex());
		});
		
		$('.fTextAlign a', $("li.current")).live('click', function(){
			var ele = $(this).parents('.editorField');
			ele.css('text-align', $(this).attr('data-align'));
			
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
		
		$('.editor-image', $("li.current")).live('dblclick', function() {
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
				ele.attr('data-field-url', resource.file);
				ele.attr('src', 'images/' + resource.file);
				hydrateSlide(sliderio.view.toolbox.currentIndex());
			}, currRes);	
		});
		
	}