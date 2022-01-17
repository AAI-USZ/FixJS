function (img) {

        var src, ext, height = $(img).width(), width = $(img).height(), aspect;

        src = $(img).attr('src');
		if (!src) return false;

        ext = src.split('.').pop(); // This could break with query string... kitten.jpg?size=large

        src = formatSrc(src);

        // valid extension?
        if( ! ext.match(/(jpg|jpeg|gif|png)/i) ) { return false; }

        aspect = calcAspect({x: width, y: height});

        if( height < 50 || width < 85 || aspect < 0.4 || aspect > 4 ) { return false; }

        return {
            url: src,
            title: $(img).attr('title'),
            height: height,
            width: width
        };

    }