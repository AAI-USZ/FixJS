function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.params.metonYear = this.getMetonYear();
      params.params.metonSynodicMonths = this.getMetonSynodicMonths();
      params.params.metonDays = this.getMetonDays();
      params.params.sarosDraconiticMonths  = this.getSarosDraconiticMonths();
      params.params.sarosSynodicMonths = this.getSarosSynodicMonths();
      return params;
}