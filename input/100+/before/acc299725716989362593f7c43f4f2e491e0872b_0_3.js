function($){

    "use strict";

    // TODO: 自动适应屏幕尺寸
    // TODO: 添加hash相关性

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

        zoom: {

            elPage: $('#zoomlay-page'),
            el: $('#zoomlay'),

            opts: {},

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
                        highSrc = img.attr('data-img');

                    if(that.opts.currentDisplay == 'double'){
                        var width = that.opts.magWidth;
                    } else {
                        var width = that.opts.magWidth * 2;
                    }

                    that.zoom.show(src, highSrc, width);
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

        setPosition: function(){

            var win = $(window),
                winWidth = win.width() - this.opts.margin * 2,
                winHeight = win.height() - this.opts.margin * 2,
                winScale = winWidth / winHeight,

                imgWidth = this.opts.imgWidth,
                imgHeight = this.opts.imgHeight,
                magWidth = imgWidth * 2,
                magHeight = imgHeight;

            // 如果是single状态下，改变magWidth宽度
            if (winScale < 1 && winScale > 0){
                console.log('single吗？');
                magWidth = imgWidth;
            }

            var magScale = magWidth / magHeight;

            if(winWidth < magWidth || winHeight < magHeight){
                // 需要缩小长度和高度
                console.log('窗口尺寸小于默认尺寸');
                // 计算新的宽度和高度
                if(magScale > winScale){
                    var newMagWidth = winWidth,
                        newMagHeight = newMagWidth / magScale;
                } else {
                    var newMagHeight = winHeight,
                        newMagWidth = newMagHeight * magScale;
                }

            } else {
                console.log('窗口尺寸大于默认尺寸');
                // 使用默认长度和高度
                newMagWidth = imgWidth * 2;
                newMagHeight = imgHeight;
            }

            if( this.opts.newMagWidth != newMagWidth || this.opts.newMagHeight != newMagHeight){
                console.log('尺寸没有发生变化');

                this.opts.newMagWidth = newMagWidth;
                this.opts.newMagHeight = newMagHeight;

                this.zoom.opts.newMagWidth = newMagWidth;
                this.zoom.opts.newMagHeight = newMagHeight;

                if(winScale > 1){
                    // Double
                    this.setDouble();
                } else if(winScale < 1 && winScale > 0){
                    // single
                    this.setSingle();
                }

                this.setWrapper(newMagWidth, newMagHeight);
            }

            // 改变wrapper的位置
            this.setWrapperPos();
            // 改变toolkit的位置

        },

        setDouble: function(){
            var magWidth = this.opts.newMagWidth,
                magHeight = this.opts.newMagHeight;
            this.el.turn("display", "double");
            this.el.turn('size', magWidth, magHeight);
            this.el.turn("resize");
            this.opts.currentDisplay = 'double';
            this.setImg((magWidth / 2), magHeight);

            console.log('转化为double了。');
        },

        setSingle: function(){
            var magWidth = this.opts.newMagWidth,
                magHeight = this.opts.newMagHeight;
            this.el.turn("display", "single");
            this.el.turn('size', magWidth, magHeight);
            this.el.turn("resize");
            this.opts.currentDisplay = 'single';
            this.setImg(magWidth, magHeight);

            console.log('转化为single了。');
        },

        setImg: function(width, height){
            $('img', this.el).css({'width': width + 'px', 'height': height + 'px'});
        },

        setWrapper: function(magWidth, magHeight){
            console.log('你好');
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

                console.log(width, winWidth, left, top);

                wrapper.css({'top': top + 'px', 'left': left + 'px'});

            var toolkit = $('#toolkit'),
                toolkitWidth = toolkit.width(),
                toolkitLeft = (winWidth - toolkitWidth) / 2;

                toolkit.css({'left': toolkitLeft + 'px'});
        },

        positionTimeOut: function(){
            positionTimeout(this, this.setPosition, 1000);
        }
    }

    // 设置延时函数
    var positionTimeoutValue,
        positionTimeout = function(obj, functions, time){
            window.clearTimeout(positionTimeoutValue);
            window.positionTimeoutFunctions = function(){
                functions.call(obj);
            }
            positionTimeoutValue = setTimeout(window.positionTimeoutFunctions, time);
        };

    $(document).ready(function(){

        // 实例化
        var turn = new Turn;
        // 初始化
        turn.initialize();
        // 计算位置
        turn.setPosition();
        // 窗口尺寸改变时重新计算位置
        $(window).resize(function(){
            turn.positionTimeOut();
        });

    });

}