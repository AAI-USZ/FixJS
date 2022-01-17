function createIframe() {
        return $('<iframe>', {
            src: 'javascript:\'\'', // 不加的话，https 下会弹警告
            frameborder: 0,
            css: {
                display: 'none',
                border: 'none',
                opacity: 0,
                position: 'absolute'
            }
        }).appendTo(document.body);
    }