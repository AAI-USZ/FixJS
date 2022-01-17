function() {
        var format;
        format = this.model.timespan() > 24 * 60 * 60 ? 'yyyy.MM.dd HH:mm:ss' : 'HH:mm:ss';
        return $.extend(true, SeriesPresenter.__super__.options.call(this), {
          lineWidth: 1,
          chartArea: {
            left: 40,
            width: '100%'
          },
          legend: {
            position: 'bottom'
          },
          vAxis: {
            title: this.get('valuesTitle')
          },
          hAxis: {
            format: format
          },
          series: this.get('series').options,
          axisTitlesPosition: 'in'
        });
      }