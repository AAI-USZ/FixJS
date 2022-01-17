function(){
        var body = document[baidu.browser.isStrict ? "documentElement" : "body"];
        var bodyWidth = body.clientWidth;
        var bodyHeight = body.clientHeight;
        var left = (((bodyWidth - this.width) / 2) | 0) + body.scrollLeft;
        var top = (((bodyHeight - this.height) / 2) | 0) + body.scrollTop;
        this.setPosition({ left: left, top: top });
    }