function(el) {
			$(el).qtip({
				content: $(el).attr('title'),
				show: {
					effect: { length: 0 }
				},
				hide: {
					effect: { length: 0 }
				},
				style: {
					tip: {
						corner : 'bottomMiddle',
						size : {x : 17, y : 10}
					},
					width : {
						min : 100
					},
					'background' : 'url("/wdn/templates_3.0/css/header/images/qtip/defaultBG.png") repeat-x bottom #FAF6BD',
					border : {
						color : '#f7e77c',
						width : 2
					},
					'color' : '#504500'
				},
				position: {
					adjust: {
						screen: true,
						y : -5
					},
					corner: { target: 'topMiddle', tooltip: 'bottomMiddle' }
				}
			});
			$(el).removeAttr('title');
			$(el).removeAttr('alt');
		}