function() {
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
            format: 'yyyy.MM.dd HH:mm:ss'
          },
          series: this.get('series').options,
          axisTitlesPosition: 'in'
        });
      }