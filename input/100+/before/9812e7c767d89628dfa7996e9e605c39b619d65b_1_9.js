function() {
//==================================================[Element 扩展 - 动画]
  /*
   * 为 Element 扩展动画方法。
   *
   * 扩展方法：
   *   Element.prototype.morph
   *   Element.prototype.fadeIn
   *   Element.prototype.fadeOut
   *   Element.prototype.highlight
   */

  // 简单动画的队列。
  var queuePool = {};

  // 播放指定的队列。
  var playQueue = function(queue) {
    queue.currentAnimation = queue.shift()
        .on('playfinish', function() {
          if (queue.length) {
            playQueue(queue);
          } else {
            delete queuePool[queue.id];
          }
        })
        .play();
  };

  // 在指定的队列中添加一个动画。
  var appendToQueue = function(uid, animation) {
    var queue = queuePool[uid];
    if (!queue) {
      queue = queuePool[uid] = [];
      queue.id = uid;
    }
    queue.push(animation);
    if (!queue.currentAnimation) {
      playQueue(queue);
    }
  };

//--------------------------------------------------[Element.prototype.morph]
  /**
   * 在本元素的动画队列中添加一个渐变动画。
   * @name Element.prototype.morph
   * @function
   * @param {Object} styles 目标样式，元素将向指定的目标样式渐变。目标样式包含一条或多条要设置的样式声明，与 setStyles 的参数的差异如下：
   *   1. 不能使用复合属性。  // TODO: 待支持。
   *   2. lineHeight 仅支持 'px' 单位的长度设置，而不支持数字。
   * @param {Object} [options] 动画选项。
   * @param {number} options.delay 延时，默认为 0，即马上开始播放。
   * @param {number} options.duration 播放时间，单位是毫秒，默认为 400。
   * @param {string} options.timingFunction 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'ease'。
   * @param {Function} options.onStart 播放开始时的回调。
   * @param {Function} options.onFinish 播放完成时的回调。
   * @returns {Element} 本元素。
   * @description
   *   队列是指将需要较长时间完成的多个指令排序，以先进先出的形式逐个执行这些指令。
   *   在元素上调用本方法添加动画时：
   *     - 若该元素并未播放动画，新添加的动画会直接开始播放。
   *     - 若该元素正在播放动画，新添加的动画将被添加到队列末端，在前一个动画播放完毕后自动播放。
   *   一个元素对应一个队列。即给不同元素添加的动画永远有不同的队列，给相同元素添加的动画永远有相同的队列。
   *   所有 Element.prototype 上提供的动画相关的方法均为实现动画的简单方式，它们只是一个捷径，可以解决大部分需求。若需要更复杂的动画效果，请考虑使用 Animation 对象实现。
   */
  Element.prototype.morph = function(styles, options) {
    var $element = this;
    options = Object.append({delay: 0, duration: 400, timingFunction: 'ease', onStart: null, onFinish: null}, options || {});
    var animation = new Animation().addClip(Fx.morph($element, styles), options.delay, options.duration, options.timingFunction);
    if (options.onStart) {
      animation.on('playstart', function(e) {
        options.onStart.call($element, e);
      });
    }
    if (options.onFinish) {
      animation.on('playfinish', function(e) {
        options.onFinish.call($element, e);
      });
    }
    appendToQueue($element.uid, animation);
    return $element;
  };

//--------------------------------------------------[Element.prototype.highlight]
  /**
   * 在本元素的动画队列中添加一个高亮动画。
   * @name Element.prototype.highlight
   * @function
   * @param {string} [property] 高亮样式名，默认为 'backgroundColor'。
   * @param {string} [color] 高亮颜色，默认为 'yellow'。
   * @param {number} [times] 高亮次数，默认为 1。
   * @param {Object} [options] 动画选项。
   * @param {number} options.delay 延时，默认为 0，即马上开始播放。
   * @param {number} options.duration 播放时间，单位是毫秒，默认为 500。
   * @param {string} options.timingFunction 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeIn'。
   * @param {Function} options.onStart 播放开始时的回调。
   * @param {Function} options.onFinish 播放完成时的回调。
   * @returns {Element} 本元素。
   * @description
   *   如果本元素正在播放一个高亮动画，则丢弃新的高亮动画并重新播放旧的高亮动画。
   *   如果当前队列的前一个动画也是高亮动画，则丢弃新的高亮动画。
   */
  Element.prototype.highlight = function(property, color, times, options) {
    var queue = queuePool[this.uid];
    if (queue) {
      if (queue.length === 0) {
        if (queue.currentAnimation.clips[0].type === 'highlight') {
          queue.currentAnimation.stop().play();
          return this;
        }
      } else {
        if (queue[queue.length - 1].clips[0].type === 'highlight') {
          return this;
        }
      }
    }

    var $element = this;
    options = Object.append({delay: 0, duration: 500, timingFunction: 'easeIn', onStart: null, onFinish: null}, options || {});
    var animation = new Animation().addClip(Fx.highlight($element, property, color, times), options.delay, options.duration, options.timingFunction);
    if (options.onStart) {
      animation.on('playstart', function(e) {
        this.off('playstart');
        options.onStart.call($element, e);
      });
    }
    if (options.onFinish) {
      animation.on('playfinish', function(e) {
        options.onFinish.call($element, e);
      });
    }
    appendToQueue($element.uid, animation);
    return $element;

  };

//--------------------------------------------------[Element.prototype.fadeIn]
  /**
   * 在本元素的动画队列中添加一个淡入动画。
   * @name Element.prototype.fadeIn
   * @function
   * @param {Object} [options] 动画选项。
   * @param {number} options.delay 延时，默认为 0，即马上开始播放。
   * @param {number} options.duration 播放时间，单位是毫秒，默认为 200。
   * @param {string} options.timingFunction 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeIn'。
   * @param {Function} options.onStart 播放开始时的回调。
   * @param {Function} options.onFinish 播放完成时的回调。
   * @returns {Element} 本元素。
   * @description
   *   display 不为 none 的元素不能播放淡入动画。
   */
  Element.prototype.fadeIn = function(options) {
    var $element = this;
    var animation = new Animation()
        .on('play', function(e) {
          if ($element.getStyle('display') === 'none') {
            var originalOpacity = $element.getStyle('opacity');
            options = Object.append({delay: 0, duration: 200, timingFunction: 'easeIn', onStart: null, onFinish: null}, options || {});
            this.addClip(Fx.morph($element, {opacity: originalOpacity}), options.delay, options.duration, options.timingFunction);
            $element.setStyles({'display': 'block', 'opacity': 0});
          } else {
            this.off('playstart.callback, playfinish.callback');
          }
        })
        .on('playstart.callback', function(e) {
          if (options.onStart) {
            options.onStart.call($element, e);
          }
        })
        .on('playfinish.callback', function(e) {
          if (options.onFinish) {
            options.onFinish.call($element, e);
          }
        });
    appendToQueue($element.uid, animation);
    return $element;
  };

//--------------------------------------------------[Element.prototype.fadeOut]
  /**
   * 在本元素的动画队列中添加一个淡出动画。
   * @name Element.prototype.fadeOut
   * @function
   * @param {Object} [options] 动画选项。
   * @param {number} options.delay 延时，默认为 0，即马上开始播放。
   * @param {number} options.duration 播放时间，单位是毫秒，默认为 200。
   * @param {string} options.timingFunction 控速函数名称或表达式，细节请参考 Animation.prototype.addClip 的同名参数，默认为 'easeOut'。
   * @param {Function} options.onStart 播放开始时的回调。
   * @param {Function} options.onFinish 播放完成时的回调。
   * @returns {Element} 本元素。
   * @description
   *   display 为 none 的元素不能播放淡出动画。
   */
  Element.prototype.fadeOut = function(options) {
    var $element = this;
    var originalOpacity;
    var animation = new Animation()
        .on('play', function(e) {
          if ($element.getStyle('display') !== 'none') {
            originalOpacity = $element.getStyle('opacity');
            options = Object.append({delay: 0, duration: 200, timingFunction: 'easeOut', onStart: null, onFinish: null}, options || {});
            this.addClip(Fx.morph($element, {opacity: 0}), options.delay, options.duration, options.timingFunction);
          } else {
            this.off('playstart.callback, playfinish.callback');
          }
        })
        .on('playstart.callback', function(e) {
          if (options.onStart) {
            options.onStart.call($element, e);
          }
        })
        .on('playfinish.callback', function(e) {
          $element.setStyles({'display': 'none', 'opacity': originalOpacity});
          if (options.onFinish) {
            options.onFinish.call($element, e);
          }
        });
    appendToQueue($element.uid, animation);
    return $element;
  };

}