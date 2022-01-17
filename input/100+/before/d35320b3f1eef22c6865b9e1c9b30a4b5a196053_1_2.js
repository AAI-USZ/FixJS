function (fieldName, value) {
				switch (fieldName) {
					case 'alt':
						image.alt = value;
						break;
					case 'border':
						if (parseInt(value)) {
							image.style.borderWidth = parseInt(value) + 'px';
							image.style.borderStyle = 'solid';
						} else {
							image.style.borderWidth = '';
							image.style.borderStyle = 'none';
						}
						break;
					case 'align':
						image.style.verticalAlign = value;
						break;
					case 'paddingTop':
					case 'paddingRight':
					case 'paddingBottom':
					case 'paddingLeft':
						if (parseInt(value)) {
							image.style[fieldName] = parseInt(value) + 'px';
						} else {
							image.style[fieldName] = '';
						}
						break;
					case 'cssFloat':
						if (Ext.isIE) {
							image.style.styleFloat = value;
						} else {
							image.style.cssFloat = value;
						}
						break;
				}
			}