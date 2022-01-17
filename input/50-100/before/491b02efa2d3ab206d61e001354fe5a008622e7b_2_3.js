function(){
    var i;

    this.series = [];

    for (i = 0; i < this.params.series.length; i++) {
      this.params.series[i].type = this.params.series[i].type || 'regions';
      this.series[i] = new jvm.DataSeries(
        this.params.series[i],
        this[this.params.series[i].type]
      );
    }
  }