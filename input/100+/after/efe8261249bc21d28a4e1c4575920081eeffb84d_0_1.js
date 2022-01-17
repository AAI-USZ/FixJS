function() {
        var format, secondPart;
        secondPart = this.get('interval') % 60 === 0 ? '' : ':ss';
        format = this.model.timespan() > 24 * 60 * 60 ? "yyyy.MM.dd HH:mm" + secondPart : "HH:mm" + secondPart;
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