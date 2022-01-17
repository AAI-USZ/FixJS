function doResize() {
        var wrapperWidth;
        var wrapperHeight;
        var slideWidth;
        var slideHeigth;
        var scale;
        var left;
        var top;
        var sidebarWidth;

        sidebar.css('height', '200px');

        wrapperWidth = wrapper.width() - HORIZONTAL_MARGIN;
        wrapperHeight = wrapper.height() - VERTICAL_MARGIN - MENU_HEIGHT;

        if (wrapperWidth - MIN_SIDEBAR_WIDTH >
                wrapperHeight / SLIDE_PROPORTION) {

            scale = wrapperHeight / SLIDE_ORIGIN_HEIGHT;

            slideWidth = SLIDE_ORIGIN_WIDTH * scale;
            slideHeight = wrapperHeight;

            top = 0;
            left = (wrapperWidth - wrapperHeight / SLIDE_PROPORTION) / 2;

            sidebarWidth = wrapperWidth- slideWidth;
        }
        else {
            sidebarWidth = MIN_SIDEBAR_WIDTH;

            slideWidth = wrapperWidth - sidebarWidth;
            slideHeight = slideWidth * SLIDE_PROPORTION;

            scale = slideWidth / SLIDE_ORIGIN_WIDTH;

            left = 0;
            top = (wrapperHeight - slideHeight) / 2;
        }

        top = MENU_HEIGHT / 2 + top + 20;

        that.scale = scale;
        that.left = Math.floor(left);
        that.top = Math.floor(top);
        that.side = Math.floor(sidebarWidth);

        slide.css('-webkit-transform', 'scale(' + that.scale + ')');
        slide.css('-moz-transform', 'scale(' + that.scale + ')');
        slide.css('-ms-transform', 'scale(' + that.scale + ')');
        slide.css('-o-transform', 'scale(' + that.scale + ')');
        slide.css('transform', 'scale(' + that.scale + ')');

        slide.css('marginTop', that.top + 'px');
        sidebar.css({
            'width': that.side + 'px',
            'height': wrapperHeight + VERTICAL_MARGIN + 'px'
        });
        title.css({
            'left': that.side + 'px'
        });
    }