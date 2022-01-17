function(){
        var body = document[baidu.browser.isStrict ? "documentElement" : "body"];
        var bodyWidth = body.clientWidth;
        var bodyHeight = body.clientHeight;
        //在Chrome下，document.documentElement.scrollTop取值为0，所以改用已经做过兼容的baidu.page.getScrollTop()。
        //scrollLeft同上
        //fixed by Dengping
        var left = (((bodyWidth - this.width) / 2) | 0) + baidu.page.getScrollLeft();
        var top = (((bodyHeight - this.height) / 2) | 0) + baidu.page.getScrollTop();
        this.setPosition({ left: left, top: top });
    }