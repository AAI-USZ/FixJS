function () {
			var width, height, dim;
			if (!init) {
				init = true;
				RocknCoder.Dimensions.init();
				// determine the dimensions dynamically
				dim = RocknCoder.Dimensions.getContent();
				$("#wrapper").css('height', dim.height);
				$scalePic.attr('src', $hiddenPic.attr('src'));
				$panPic.attr('src', $hiddenPic.attr('src'));

				width = $scalePic.width();
				height = $scalePic.height();
				$("#scroller").css("width", width).css("height", height);

				if (width > height) {
					$scalePic.width(dim.width);
				} else {
					$scalePic.height(dim.height);
				}
			}
		}