function(e)
        {
            var url = $.param.fragment();
            that.currentMetric = $.bbq.getState('metric', true) || 'peoples';
            $('#formula').val(that.options.globalData.metrics[that.currentMetric].formula);
            $('#formula_min').val(that.options.globalData.metrics[that.currentMetric].min);
            $('#formula_norma').val(that.options.globalData.metrics[that.currentMetric].norma);
            $('#formula_max').val(that.options.globalData.metrics[that.currentMetric].max);

            $('#navigation .active').removeClass('active');
            $('#navigation a[href=#' + that.currentMetric + ']').parent().addClass('active').parent().parent().addClass('active');

            that.colorize();
        }