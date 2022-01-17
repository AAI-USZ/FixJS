function(){
	var slideTemplate = (function(){
		
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

		var handleDrop = function(e) {
			if(e.stopPropagation) {
				e.stopPropagation();
			}

			return false;
		};

		var handleDragOver = function(e) {
			if (e.preventDefault) {
				e.preventDefault(); 
			}
			return false;
		}

		var handleDropImage = function() {
			var img = document.querySelector('#drag-image');
			var droparea = document.querySelector('#drag-image').parentNode;

			droparea.ondragover = handleDragOver;
			droparea.ondragend = handleDrop;
			
			droparea.ondrop = function (e) {
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
				console.log(e.dataTransfer.files);
			}
		};

		return {
			init: init,
			addLayout: addLayout
		};

	})();

	return slideTemplate;
}