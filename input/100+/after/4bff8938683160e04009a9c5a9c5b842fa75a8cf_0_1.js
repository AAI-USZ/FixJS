function(){
						// scan 15 links at a time...
						var chunkLength = Math.min((modules['commentPreview'].commentMenusCount - modules['commentPreview'].commentMenusi), 15);
						for (var i=0;i<chunkLength;i++) {
							var viewSource = document.createElement('li');
							viewSource.innerHTML = '<a href="javascript:void(0)">source</a>';
							viewSource.addEventListener('click', modules['commentPreview'].viewSource, false);
							// if (modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling) {
							//	insertAfter(modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling, viewSource);
							//} else {
								if (modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling != null) {
									insertAfter(modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling, viewSource);
								} else {
									insertAfter(modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi], viewSource);
								}
							//}
							modules['commentPreview'].commentMenusi++;
						}
						if (modules['commentPreview'].commentMenusi < modules['commentPreview'].commentMenusCount) {
							setTimeout(arguments.callee, 1000);
						} 
					}