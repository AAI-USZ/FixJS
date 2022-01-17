function () {
      var $elem = $(this);
      var $container = $elem.find('.' + option.container);
      //将控件容器下的的幻灯片节点使用div.slide-control包裹
      //在html结构中限定
      //$slides.wrapAll(/*$control*/$('<div class="slide-control"/>'));
      var $control = $container.find(">div.slide-controller");
//            var $control = $('<div class="slide-control"/>'); //此时和dom节点中的不关联;更新dom后获取
      var $slides = /*$container*/$control.children();
      var $imgs = $slides.find("img");
      var total = $slides.size();//幻灯片数目
      //如果获取准确的宽高
      //1.显式配置;2.在img上设置width,height属性;3,通过脚本判断获取(TODO:未完成)
      var width = option.width || $imgs.width()/*$slides.outerWidth()在某些情形下获取值不准确*/;
      var height = option.height || $imgs.height()/*$slides.outerHeight()*/;
      var start = option.start - 1;
      var next = 0;
      var prev = 0;
      var current = 0;//重置默认配置为0
      var loaded;  //资源就绪
      var active;  //锁,值为false值时才能开启一次动画
      var clicked; //手动选择的图片
      var position;
      var effect = option.effect;
      var direction; //正(左、上)、负向
//            var imageParent;//预加载时使用
      var duration = option.duration;
      if ( duration < 2000 ) {
        duration = 2000;
      }
      var pauseTimeout;
      var playInterval;
      if (total > option.maxNum) {
        alert("最多允许6张图片!");
        return;
      }
      if ( (!option.width || !option.height) && (!$slides.find("img").attr("width") || !$slides.find("img").attr("height")) ) {
        alert("控件宽高调用错误!");
        return;
      }
      //设定图片的宽、高;在自定义控件宽高时使用
      //此时不使用等比缩放、简单的将容器的宽、高赋值
      if ( option.width && option.height ) {
        $slides.find("img").attr("width", width).attr("height", height);
      }
      //设定容器的宽高
      //确定控件容器拥有样式: overflow: hidden; position: relative;
      //设定控制容器的样式
      $container.css({
        "overflow":"hidden",
        "position":"relative",
        "width":width + "px",
        "height":height + "px"
      });
      $control.css({
        "position":"relative",
        "top":-height + "px", //slide control
        "left":-width + "px", //slide control
        "width":total * width + "px",
        "height":total * height + "px"
      });
      //设定幻灯片的样式
      $slides.css({
        "position":"absolute",
        "display":"none",
        "top":height + "px",
        "left":width + "px",
        "z-index":0
      });
      if (total < 2) { //只有一帧
        $container.fadeIn(duration, function () {
          loaded = true;
          option.slideLoaded();
        });
        return false;
      }
      if (start < 0) {
        start = 0;
      }
      if (start > total) {
        start = total - 1;
      }
      //根据配置的开始帧 设置 当前帧 下标
      if (option.start) {
        current = start;
      }

      //显示控件
      $container.css("display", "block");

      //此时只是简单的显示开始帧
      $control.children(":eq(" + start + ")").fadeIn(duration, function () {
        loaded = true;
        option.slideLoaded();
      });
      //生成手动操作入口
      if (option.pagination) {
        var ulCss = {"position":"absolute", "right":"25px", "bottom":"12px", "z-index":6};
        var ul = '<ul class=' + option.paginationClass + '>';
        for (var i = 0; i < total; i++) {
          ul += '<li><a href="javascript:;">' + (i+1) + '</a></li>';
        }
        ul += '</ul>';
        $(ul).appendTo($container).css(ulCss);
        $elem.find('.' + option.paginationClass + ' li:eq(' + start + ')').addClass(option.currentClass);
        //绑定手动播放事件-->TODO:提供参数表示触发类型
        switch ( "click" || /*屏蔽了hover状态*/ option.paginationType ) {
          case "click":
            $elem.find("ul." + option.paginationClass + ">li>a").click(function () {
              //强制中止动画
              if ( option.play ) {
                _pause();
              }
              //显示数字从1开始;计算下标由0开始
              clicked = parseInt($(this).text(), 10)-1;
              if (current != clicked) {
                _animate('pagination', effect, clicked);
              }
              return false;
            });
            break;
//          case "hover": //控制上再滑动是不连贯-暂时屏蔽掉
//            break;
          default:
            break;
        }
      }
      //开始图片播放
      if (option.play) {
        playInterval = setInterval(function () {
          _animate('next', effect);
        }, option.play);
        $elem.data("interval", playInterval);
      }
      function _animate(direction, effect, clicked) {
        if (!loaded || active) return;
        //动画开始前调用
        option.animationStart(current + 1);
        //根据动画方向 更新配置参数
        switch (direction) {
          case "next":
            prev = current;
            next = current + 1;
            next = ( total === next ) ? 0 : next;
            current = next;
            if (effect == "h") {
              position = width * 2;
              direction = -position;
            } else if (effect == "v") {
              position = height * 2;
              direction = -position;
            }
            break;
          case "prev":
            prev = current;
            next = current - 1;
            next = ( next = -1 ) ? total - 1 : next;
            position = direction = 0;
            current = next;
            break;
          case "pagination":
            prev = $elem.find('.' + option.paginationClass + ' li.' + option.currentClass + ">a").text();
            prev = parseInt(prev, 10)-1;
            next = clicked;
            if (prev < next) {
              if (effect == "h") {
                position = width * 2;
                direction = -position;
              } else if (effect == "v") {
                position = height * 2;
                direction = -position;
              }
            } else {
              position = direction = 0;
            }
            current = next;
            break;
          //其他
        }
        //动画效果
        switch( effect ) {
          case "h":
            $control.children(":eq(" + next + ")").css({
              "left":position + "px",
              "display":"block"
            });
            $control.animate({
              "left":direction + "px"
            }, duration, function () {
              //重置动画控制对象参数
              $control.css({
                "left":-width + "px"
              });
              $control.children(':eq(' + next + ')').css({
                "left":width + "px",
                zIndex:5
              });
              $control.children(':eq(' + prev + ')').css({
                "left":width + "px",
                display:'none',
                zIndex:0
              });
              //结束动画
              option.animationComplete(next + 1);
              active = false;
            });
            break;
          case "v":
            $control.children(":eq(" + next + ")").css({
              "top":position + "px",
              "display":"block"
            });
            $control.animate({
              "top":direction + "px"
            }, duration, function () {
              //重置动画控制对象参数
              $control.css({
                "top":-height + "px"
              });
              $control.children(':eq(' + next + ')').css({
                "top":height + "px",
                "z-index": 5
              });
              $control.children(':eq(' + prev + ')').css({
                "top":height + "px",
                "display":"none",
                "z-index": 0
              });
              //结束动画
              option.animationComplete(next + 1);
              active = false;
            });
            break;
          case "fade":
            $control.children(":eq(" + next + ")").css({
              "z-index": 5//6?5?7?
            }).fadeIn( duration, function(){
                $control.children(":eq(" + prev + ")").css({
                  "z-index": 0,
                  "display": "none"
                });
                //重置z-index
                $control.children(":eq(" + next + ")").css({
                  "z-index": 0
                });
                //结束动画
                option.animationComplete(next + 1);
                active = false;
              });
            break;
          default:
            break;
        }
        // 更新手动操作样式
        if (option.pagination) { //可直接替换
          //删除
          $elem.find('.' + option.paginationClass + ' li.' + option.currentClass).removeClass(option.currentClass);
          // 添加
          $elem.find('.' + option.paginationClass + ' li:eq(' + next + ')').addClass(option.currentClass);
        }
      }

      /**
       * 清除自动播放周期
       */
      function _stop() {
        clearInterval($elem.data('interval'));
      }

      /**
       * 清除定时器;延时添加定时器
       */
      function _pause() {
        if (option.pause) {
          clearTimeout($elem.data('pause'));
          clearInterval($elem.data('interval'));
          pauseTimeout = setTimeout(function () {
            clearTimeout($elem.data('pause'));
            playInterval = setInterval(function () {
              _animate('next', effect);
            }, option.play);
            $elem.data("interval", playInterval);
          }, option.pause);
          $elem.data('pause', pauseTimeout);
        } else {
//          _stop();//这种需求很少
        }
      }
    }