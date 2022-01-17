function() {
  var $, ß,
    __slice = [].slice;

  $ = jQuery;

  ß = io.connect('http://queueserver.asio-otus.local/');

  this.SQStatus = (function() {
    var defaults;

    SQStatus.name = 'SQStatus';

    defaults = {
      interval: 500,
      queuename: 'default'
    };

    function SQStatus(element, options) {
      this.elem = $(element);
      this.options = $.extend({}, defaults, options);
      this.recently = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.interval_id = null;
    }

    SQStatus.prototype.start = function() {
      var _this = this;
      if (!this.interval_id) {
        return this.interval_id = window.setInterval(function() {
          return ß.emit('status', _this.options['queuename'], function(data) {
            var lastvalues, qlen;
            qlen = data.queue_length;
            lastvalues = _this.recently.slice(0);
            lastvalues.shift();
            lastvalues.push(qlen);
            if (lastvalues.every(function(itm) {
              return itm === 0;
            })) {
              return _this.elem.html("<b>Currently Idle</b>");
            } else {
              return _this.elem.html("<b>" + qlen + "</b> Queued Signals");
            }
          });
        }, this.options.interval);
      }
    };

    SQStatus.prototype.stop = function() {
      if (this.interval_id) {
        return window.clearInterval(this.interval_id);
      }
    };

    return SQStatus;

  })();

  $.fn.extend({
    sqstatus: function() {
      var args, cmd, command;
      cmd = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      command = ("" + cmd).toLowerCase();
      return this.each(function() {
        var instance;
        instance = $.data(this, 'sqstatus');
        if (!instance) {
          return $.data(this, 'sqstatus', new SQStatus(this, args));
        } else if (typeof options === "string") {
          return instance[command].apply(instance, args);
        }
      });
    }
  });

}