function (e) {
            var url = $.param.fragment();
            that.currentMetric = $.bbq.getState('metric', true) || 'peoples';
            $('#formula').val(that.options.globalData.metrics[that.currentMetric].formula);
            that.colorize();
        }