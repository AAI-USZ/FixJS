function(items) {
		if (items) {
			enyo.log('setItems' + items.length);
			switch (items.length) {
			case 4:
				this.createComponents([{
					kind:
					'io.Tiny4Img',
					src: items[0].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[1].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[2].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[3].images.low_resolution.url
				}]);
				break;
			case 3:
				this.createComponents([{
					kind:
					'io.Tiny4Img',
					src: items[0].images.low_resolution.url
				},
				{
					kind: 'io.Tiny4Img',
					src: items[1].images.low_resolution.url
				},
				{
					kind: 'io.TinyH2Img',
					src: items[2].images.standard_resolution.url
				}]);
				break;
			case 2:
				this.createComponents([{
					kind:
					'io.TinyV2Img',
					src: items[0].images.standard_resolution.url
				},
				{
					kind: 'io.TinyV2Img',
					src: items[1].images.standard_resolution.url
				}]);
				break;
			case 1:
				this.createComponent({
					kind:
					'io.Tiny1Img',
					src: items[0].images.standard_resolution.url
				});
				break;
			default:
				return;
			}
			/*
			this.createComponent({
				tag: 'div',
				style: 'clear: both;'
			});
			*/
		}
	}