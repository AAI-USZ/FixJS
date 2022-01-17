function(obj) {
		if ((typeof(obj) != 'undefined') && (hasClass(obj, 'keyHighlight'))) {
			return false;
		} else if (typeof(obj) != 'undefined') {
			addClass(obj, 'keyHighlight');
			if ((this.pageType == 'linklist') || (this.pageType == 'profile')) RESStorage.setItem('RESmodules.keyboardNavLastIndex.'+location.href, this.activeIndex);
			if ((this.pageType == 'comments') && (this.options.commentsLinkNumbers.value)) {
				var links = obj.querySelectorAll('div.md a');
				var annotationCount = 0;
				for (var i=0, len=links.length; i<len; i++) {
					if ((!(hasClass(links[i],'madeVisible'))) && (!(hasClass(links[i],'toggleImage')) && (!(hasClass(links[i],'noKeyNav'))))) {
						var annotation = document.createElement('span');
						annotationCount++;
						annotation.innerHTML = '['+annotationCount+'] ';
						annotation.title = 'press '+annotationCount+'to open link';
						addClass(annotation,'keyNavAnnotation');
						/*
						if (!(hasClass(links[i],'hasListener'))) {
							addClass(links[i],'hasListener');
							links[i].addEventListener('click', modules['keyboardNav'].handleKeyLink, true);
						}
						*/
						links[i].parentNode.insertBefore(annotation, links[i]);
					}
				}
			}
		}
	}