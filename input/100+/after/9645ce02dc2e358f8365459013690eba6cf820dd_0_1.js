function(e){
			
			var currentCount = this.count;
			var self = this;
			var a = new Element('a', {
				'events':{
					'click':function(e){
						location.hash = currentCount;
						$('content').empty();
						this.getElements('! ! li a').removeClass('active');
						this.addClass('active');
						var iframe = new IFrame({
							'src':self.dirpath.substitute({count:currentCount}),
							'styles':{
								'border':0,
								'width':window.getSize().x,
								'height':window.getSize().y-50
							}
						});
						iframe.inject($('content'));
					}
				}
			});
			var li = new Element('li');
			
			this.img.inject(a);
			a.inject(li);
			li.inject(this.ul, 'top');
			
			if( this.directPage === '' ){
				clearInterval(this.delayCheck);
				this.delayCheck = (function(){
					a.fireEvent('click');
				}).delay(200, this);
			} else if( this.directPage === this.count){
				a.fireEvent('click');
			}
			
			this.count++;
			this.getItem();
			
		}