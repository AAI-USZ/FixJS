function (results) {
    // FIXME: this just retrieves the first four results
    // we could limit based on a threshold too.
    // FIXME: use localized 'N% match' format string
    var source = $("[id^=id_source_f_]").first().val(),
        filtered = [];

    for (var i=0; i<results.length && i<3; i++) {
      results[i].source = this.doDiff(source, results[i].source);
      results[i].target = this.fancyHl(results[i].target);
      results[i].qTitle = Math.round(results[i].quality) + '% match';
      filtered.push(results[i]);
    }

    return filtered;
  }