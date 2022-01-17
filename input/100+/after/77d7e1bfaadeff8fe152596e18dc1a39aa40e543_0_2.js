function(el, where){	//TODO: add functionality for x position

				if(!$.is$(el)) el = $(el);

				

				if(where=='bottom'){

					var itemPos = el.offset();

					var newTop = itemPos.top-this.jqEl.offset().bottom+itemPos.height;

					newTop+=4;	//add a small space

				} else {

					var itemTop = el.offset().top;

					var newTop = itemTop-document.body.scrollTop;

					var panelTop = this.jqEl.offset().top;

					if (document.body.scrollTop<panelTop){

						newTop -= panelTop;

					}

					newTop-=4;	//add a small space

				}

				

				this.scrollBy({y:newTop, x:0}, 0);	

			}