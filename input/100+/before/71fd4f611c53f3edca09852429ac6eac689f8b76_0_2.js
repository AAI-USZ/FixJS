function (units) {
    var i, unit,
        cls = "even",
        even = true,
        rows = "";

    for (i=0; i<units.length; i++) {
      unit = units[i];

      // Build context row i
      rows += '<tr id="ctx' + unit.id + '" class="context-row ' + cls + '">';
      rows += this.tmpl.vUnit($, {data: {meta: this.meta,
                                         unit: unit}}).join("");
      rows += '</tr>';

      // Update odd/even class
      cls = even ? "odd" : "even";
      even = !even;
    }

    return rows;
  }