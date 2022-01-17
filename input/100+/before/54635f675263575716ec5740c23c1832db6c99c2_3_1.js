function() {
		var li = $(this);
		li.parent().find('li').removeClass('selected selected_by_default');
		li.addClass('selected');

		var type = encodeURIComponent(li.attr('name'));
		var boxdiv = li.parents('.boxdiv');
		var front = boxdiv.children('.front');
		var url = ROOT_PATH+"/app/Display/load/type/"+type;
		var id = 'f' + Math.abs((boxdiv.attr('id')+url).hashCode());

		var iframe = byId(id);
		if (!iframe)
		{
			var other_frames = front.find('iframe');
			other_frames.remove();

			iframe = newDom('iframe');
			iframe.setAttribute('src', url);
			iframe.id = id;
			front.append(iframe);
		}

		iframe.className = 'visualization';

		/*iframe.onload = function() {
			iframe.style.height = iframe.contentWindow.document.body.offsetHeight + 20 + 'px';
						//iframe.style.width = iframe.contentWindow.document.body.offsetWidth + 'px';
					};*/

	}