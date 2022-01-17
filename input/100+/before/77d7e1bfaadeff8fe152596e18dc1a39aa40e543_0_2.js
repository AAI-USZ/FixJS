function(el){	//TODO: add functionality for x position

				if(!$.is$(el)) el = $(el);

				var itemTop = el.offset().top;

				var panelTop = this.jqEl.offset().top;

				var newTop = itemTop-document.body.scrollTop;

				if (document.body.scrollTop<panelTop){

					newTop -= panelTop;

				}

				newTop-=4;	//add a small space

				this.scrollBy({y:newTop, x:0}, 0);	

			}