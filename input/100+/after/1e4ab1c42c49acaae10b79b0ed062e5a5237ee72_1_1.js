function(slide, callback) {
			
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

		}