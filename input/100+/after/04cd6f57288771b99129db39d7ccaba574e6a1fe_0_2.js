function(links){
		var b=$('#breadcrumbs'),span,first=b.children(':first-child'),url;
		b.html(first);
		$.each(links,function(i,l){
			b.append(separator);
			span=$('<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"/>').appendTo(b);
			if(/*$.type(i)==='number'*/$.isNumeric(i)) $('<span/>').text(l).appendTo(span);
			else{
				url=S.isObject(l) ? l.url : l;
				span.append($('<a/>').attr(linkoptions).attr('href',url).html($('<span itemprop="title"/>').text(i)));
			}
		});
		span.addClass('last');
	}