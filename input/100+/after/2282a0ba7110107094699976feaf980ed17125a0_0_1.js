function (width, height) {

				clearTimeout(spinnerTimeout);
				$container.spin(false);

				// $img.hide().attr('src', src).fadeIn(100);
				$img.fadeOut(100, function () {

					$img.attr('src', src).fadeIn(200);
					setTimeout(adjustSize, 1);
				});

				// adjustSize();
				// setTimeout(adjustSize, 1);

				$('#preview-bar-label').text(currentEntries[currentIdx].label);
				$('#preview-bar-percent').text('' + (100 * $img.width() / width).toFixed(0) + '%');
				$('#preview-bar-size').text('' + width + 'x' + height);
				$('#preview-bar-idx').text('' + (currentIdx + 1) + ' / ' + currentEntries.length);
				$('#preview-bar-original').find('a').attr('href', currentEntries[currentIdx].absHref);
			}