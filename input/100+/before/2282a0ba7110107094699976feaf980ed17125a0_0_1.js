function (width, height) {

				clearTimeout(spinnerTimeout);
				$container.spin(false);

				$img.attr('src', src).show();

				adjustSize();

				$('#preview-bar-label').text(currentEntries[currentIdx].label);
				$('#preview-bar-percent').text('' + (100 * $img.width() / width).toFixed(0) + '%');
				$('#preview-bar-size').text('' + width + 'x' + height);
				$('#preview-bar-idx').text('' + (currentIdx + 1) + ' / ' + currentEntries.length);
				$('#preview-bar-original').find('a').attr('href', currentEntries[currentIdx].absHref);
			}