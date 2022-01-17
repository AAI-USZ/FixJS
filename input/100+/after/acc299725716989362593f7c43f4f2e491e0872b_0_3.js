function($){

    "use strict";

    // 构造函数
    var Turn = function(){};

    Turn.prototype = {

        el: $('#magazine'),

        opts: {
            allowZoom: true,
            doubleDisplay: true,

            imgWidth: 500,
            imgHeight: 600,
            margin: 30,

            currentDisplay: 'double'
        },

        initialize: function(){
            
            var that = this;

            // turn事件
            this.el.turn({
                width: this.opts.imgWidth * 2,
                height: this.opts.imgHeight
            });

            // 绑定zoom in事件
            this.el.delegate('.page', 'click', function(event){
                if(that.opts.allowZoom){
                    var selector = $(event.target),
                        img = $('img', selector),
                        src = img.attr('src'),
                        highSrc = img.attr('data-img'),
                        imgWidth;

                    if(that.opts.currentDisplay == 'double'){
                        imgWidth = that.opts.newMagWidth;
                    } else {
                        imgWidth = that.opts.newMagWidth * 2;
                    }

                    that.zoom.show(src, highSrc, imgWidth);
                    return false;
                }
            });

            // 绑定zoom可拖动事件
            this.zoom.elPage.draggable();

            // 绑定zoom out事件
            this.zoom.elPage.on('click', function(){
                that.zoom.hide();
            });

            // 杂志翻页事件
            this.el.on("turning", function(event, page, view) {
                that.opts.allowZoom = false;
            });

            this.el.on("turned", function(event, page, view) {
                that.opts.allowZoom = true;
            });

            // 按键事件
            $(window).on('keydown', function(event){
                if (event.keyCode == 37){
                    that.el.turn('previous');
                }
                else if (event.keyCode==39){
                    that.el.turn('next');
                }
            });

            // 按钮单击事件
            $('#mag-first').on('click', function(){
                that.el.turn('page', 1);
                return false;
            });

            $('#mag-preview').on('click', function(){
                that.el.turn('previous');
                return false;
            });

            $('#mag-next').on('click', function(){
                that.el.turn('next');
                return false;
            });
        },

        zoom: {

            elPage: $('#zoomlay-page'),
            el: $('#zoomlay'),

            show: function(src, highSrc, width){

                this.elPage.css({'width': width + 'px'});

                // 插入低分辨率图片
                var low = '<img id="zoomlayLow" src="'+ src +'" width="'+ width +'">';

                this.elPage.html(low);
                this.el.fadeIn(800);

                // 如果存在高分辨率图片
                // 插入zoomlay中，并等待加载完毕后替换low图片
                if(highSrc){
                    var high = '<img id="zoomlayHigh" src="'+ highSrc +'" width="'+ width +'" style="display: none;">';
                    this.elPage.append(high);

                    var $high = $('#zoomlayHigh'),
                        $low = $('#zoomlayLow');

                    $high.load(function(){
                        $low.hide();
                        $high.show();
                    });
                }
            },

            hide: function(){
                this.el.fadeOut('fast');
                this.elPage.empty();
            }
        },

        setPosition: function(){

            var win = $(window),
                winWidth = win.width() - this.opts.margin * 2,
                winHeight = win.height() - this.opts.margin * 2,
                winScale = winWidth / winHeight,

                imgWidth = this.opts.imgWidth,      // 默认图片的宽度
                imgHeight = this.opts.imgHeight,    // 默认图片的高度
                magWidth = imgWidth * 2,            // 默认杂志的宽度
                magHeight = imgHeight;              // 默认杂志的高度

            // 如果是single状态下，改变magWidth宽度
            if (winScale < 1 && winScale > 0){
                magWidth = imgWidth;
            }

            var magScale = magWidth / magHeight;    // 杂志的高宽比

            // 判断窗口尺寸是否大于杂志尺寸
            if(winWidth < magWidth || winHeight < magHeight){
                // 需要缩小长度和高度
                // 计算新的宽度和高度
                if(magScale > winScale){
                    // 根据窗口的宽度来得到高度
                    var newMagWidth = winWidth,
                        newMagHeight = newMagWidth / magScale;
                } else {
                    // 根据窗口的高度来得到宽度
                    var newMagHeight = winHeight,
                        newMagWidth = newMagHeight * magScale;
                }

            } else {
                // 使用默认长度和高度
                newMagWidth = imgWidth * 2;
                newMagHeight = imgHeight;
            }

            // 判断本地新尺寸是否和全局新尺寸一致
            if( this.opts.newMagWidth != newMagWidth || this.opts.newMagHeight != newMagHeight){

                // 将新尺寸赋值于全局
                this.opts.newMagWidth = newMagWidth;
                this.opts.newMagHeight = newMagHeight;

                // 设置magazine的尺寸
                if(winScale > 1){
                    // Double
                    this.setDouble();
                } else if(winScale < 1 && winScale > 0){
                    // single
                    this.setSingle();
                }

                // 设置wrapper的尺寸
                this.setWrapper(newMagWidth, newMagHeight);
            }

            // 改变wrapper的位置
            this.setWrapperPos();

        },

        setDouble: function(){
            var magWidth = this.opts.newMagWidth,
                magHeight = this.opts.newMagHeight;

            this.el.turn("display", "double");
            this.el.turn('size', magWidth, magHeight);
            this.el.turn("resize");

            this.opts.currentDisplay = 'double';
            this.setImg((magWidth / 2), magHeight);
        },

        setSingle: function(){
            var magWidth = this.opts.newMagWidth,
                magHeight = this.opts.newMagHeight;

            this.el.turn("display", "single");
            this.el.turn('size', magWidth, magHeight);
            this.el.turn("resize");

            this.opts.currentDisplay = 'single';
            this.setImg(magWidth, magHeight);
        },

        setImg: function(width, height){
            $('img', this.el).css({'width': width + 'px', 'height': height + 'px'});
        },

        setWrapper: function(magWidth, magHeight){
            $('#wrapper').css({'width': magWidth + 'px', 'height': magHeight + 'px'});
        },

        setWrapperPos: function(){
            var wrapper = $('#wrapper'),
                win = $(window),

                width = wrapper.width(),
                height = wrapper.height(),

                winWidth = win.width(),
                winHeight = win.height(),

                left = ((winWidth - width) / 2),
                top = ((winHeight - height) / 2);

                wrapper.css({'top': top + 'px', 'left': left + 'px'});

            var toolkit = $('#toolkit'),
                toolkitWidth = toolkit.width(),
                toolkitLeft = (winWidth - toolkitWidth) / 2;

                toolkit.css({'left': toolkitLeft + 'px'});
        },

        delaySetPosition: function(){
            // 为setTimeOut调整作用域
            var delayFunc = jQuery.proxy(this, "setPosition");
            clearTimeout(window.TurnDelay);
            window.TurnDelay = setTimeout(delayFunc, 1000);
        }
    }

    $(document).ready(function(){

        var turn = new Turn;
        // 初始化
        turn.initialize();

        // 计算位置
        turn.setPosition();

        // 窗口尺寸改变时重新计算位置
        $(window).resize(function(){
            turn.delaySetPosition();
        });

    });

}