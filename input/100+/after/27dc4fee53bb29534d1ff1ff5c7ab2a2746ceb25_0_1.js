function(){

				var $this = $(this),
					data = $this.data('pSlider');
				
				if( !data )
				{
					var container = $this.parent(),
						container_width = container.width();
					
					var items = $this.children(),
						items_count = items.length,
						items_width = 0,
						//item_widths = [],
						item_index = 0;

					if(!items_count) return;

					items.each(function(){
						var item_width = $( this ).outerWidth( true );
						$(this).addClass('slider-item-original').addClass('slider-item-' + item_index);
						//$(this).attr('title', 'width: ' + item_width + 'px');
						//item_widths[item_index] = item_width;
						items_width += item_width;
						item_index++;
					});
					
					// it should cover at least 3 containers width, and have at least 2 copies
					var copies = Math.max(2, Math.floor(3 * container_width / items_width));
					
					for(var copy=0; copy<copies; ++copy) {
						var items_copy = items.clone();
						item_index = 0;
						items_copy.removeClass('slider-item-original').each(function(){
							//item_widths[copy*items_count + item_index] = item_widths[item_index];
							$(this).addClass('slider-item-copy slider-item-copy-' + copy);
							item_index++;
						}).appendTo($this);
					}
					
					var items_total_count = items_count * (copies + 1);
					var items_total_width = items_width * (copies + 1);
					
					data = {
						options: cfg,
						
						// container
						container: container,
						containerWidth: container_width,
						
						// original set of items
						itemsCount: items_count,
						itemsWidth: items_width,
						
						// how many copies of the items have we made?
						copies: copies,
						
						// all items, including copies
						itemsTotalCount: items_total_count,
						itemsTotalWidth: items_total_width

						//currentItem: 0
					};
					if(cfg.debug) debug({data: data});

					container.css({
						position: 'relative'
					});
					
					$this.css({
						position: 'absolute',
						width: items_total_width,
						left: -1 * items_width
					});
					
					$this.data('pSlider', data);
					
					// scroll one item at a time
					$this.bind('nextItem', handleEvent);
					$this.bind('prevItem', handleEvent);
					
					// scroll pre-defined block size at a time
					$this.bind('nextBlock', handleEvent);
					$this.bind('prevBlock', handleEvent);
					
					// scroll full page (full length of container)
					$this.bind('nextPage', handleEvent);
					$this.bind('prevPage', handleEvent);
					
					// next/prev events depend on mode: if mode=item , then next=nextItem, etc. (ignored for mode=smooth)
					$this.bind('next', handleEvent);
					$this.bind('prev', handleEvent);
					
					// slideshow
					$this.bind('start', handleEvent);
					$this.bind('stop', handleEvent);
				}
			
			}