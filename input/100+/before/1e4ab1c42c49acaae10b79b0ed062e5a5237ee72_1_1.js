function(slide) {
			slide.load('./layouts/'+this.attr('title')+'.html', function(){
				$('span', this).on('click', function(e){
					e.stopPropagation();
				});
			});

		}