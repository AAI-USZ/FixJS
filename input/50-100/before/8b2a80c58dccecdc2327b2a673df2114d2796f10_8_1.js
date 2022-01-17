function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.metonYear = this.getMetonYear();
      params.metonSynodicMonths = this.getMetonSynodicMonths();
      params.metonDays = this.getMetonDays();
      params.sarosDraconiticMonths  = this.getSarosDraconiticMonths();
      params.sarosSynodicMonths = this.getSarosSynodicMonths();
      return params;
}