function(){
		
		var init = function(layouts) {
			$('img', layouts).each(function(idx, el){
				$(el).on('click', function(){
					$(this).trigger('addLayout');
				});
			});
		};

		var addLayout = function(slide, callback) {
			
			slide.load('./layouts/'+this.attr('title')+'.html', function(){
				$('span', this).on('click', function(e){
					e.stopPropagation();
				});

				var img = $('.slide-image', slide);
				if(img.length) {
					img.attr('id','drag-image');
					handleDropImage();
				} else {
					console.log('no image');
				}

				if(callback && typeof callback === 'function') {
					callback();
				}
			});

		};

		var updateSettings = function(e){
			e.preventDefault();
			e.stopPropagation();
			var val1 = $('input', $(this)).eq(0).val();
			var val2 = $('input', $(this)).eq(1).val();
			$('html').css({
				'background' : 'rgba(0, 0, 0, 0) -webkit-radial-gradient(50% 50%, ellipse cover, '+val1+' 0%, '+val2+' 100%)'
			});
		};

		var finishedSettings = function(e){
			e.preventDefault();
			e.stopPropagation();
			$('section').html('');
		};

		var showSettings = function(s) {
			var modal = $('#modal');
			if(!modal.length) modal = $('<div/>').attr('id', 'modal');
			else modal.toggleClass('hide');
			var that = this;
			modal.load('./layouts/settings.html', function(){
				modal.appendTo(that);
				$('form', $(this)).on('submit', updateSettings);
				$('#settings-finished', $(this)).on('click', function(){
					modal.toggleClass('hide');
				});
			});
		};

		var handleDropImage = function() {
			var img = document.querySelector('#drag-image');
			var droparea = document.querySelector('#drag-image').parentNode;

			droparea.ondragover = function(){
				this.classList.add('onhover');
			};

			droparea.ondragleave = function(){
				this.classList.remove('onhover');
			};
			
			droparea.ondrop = function (e) {
				droparea.classList.remove('droppable');
				e.preventDefault();
				droparea.removeChild(img);
				var reader = new FileReader();
				reader.onload = function (event) {
					var image = new Image();
					image.src = event.target.result;
					image.width = 250; // a fake resize
					droparea.appendChild(image);
				};
				reader.readAsDataURL(e.dataTransfer.files[0]);
			};
		};

		return {
			init: init,
			addLayout: addLayout,
			showSettings: showSettings
		};

	}