function() {
        var target = this.target;
        var iframe = this.iframe;

        var height = target.outerHeight();
        var width = target.outerWidth();

        // 如果目标元素隐藏，则 iframe 也隐藏
        // jquery 判断宽高同时为 0 才算隐藏，这里判断宽高其中一个为 0 就隐藏
        // http://api.jquery.com/hidden-selector/
        if (!height || !width || target.is(':hidden')) {
            iframe && iframe.hide();
        } else {
            // 第一次显示时才创建：as lazy as possible
            iframe || (iframe = this.iframe = createIframe());

            iframe.css({
                'height': height,
                'width': width,
                'zIndex': parseInt(target.css('zIndex')) - 1 || 0
            });

            Position.pin(iframe[0], target[0]);
            iframe.show();
        }

        return this;
    }