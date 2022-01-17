function(jobs) {
      var self = this;

      $('#chordView').append('<div class=\'row\'><div class=\'span6\' id=\'chordViewViz\'></div><div class=\'span6\'><table id="job-props" class="table"><thead></thead><tbody></tbody></table></div></div>');

      // jobs themselves are arc segments around the edge of the chord diagram
      var arcMouse = d3.svg.arc()
        .innerRadius(50)
        .outerRadius(_r0 + 300)
        .startAngle(_groupStartAngle)
        .endAngle(_groupEndAngle);
      var arc = d3.svg.arc()
        .innerRadius(_r0)
        .outerRadius(_r0 + 10)
        .startAngle(_groupStartAngle)
        .endAngle(_groupEndAngle);

      // set up canvas
      // TODO(Andy Schlaikjer): Is this safe in the presence of multiple view
      // impls which may want to add children to #chart element? Should this
      // instead reference the 'view' var?
      _svg = d3.select("#chordViewViz")
        .append("svg:svg")
        .attr("width", _r1 * 3)
        .attr("height", _r1 * 2)
        .on('mouseout', function(d, i) {
          _handleChartMouseOut.call(self, d, i);
        })
        .append("svg:g")
        .attr("transform", "translate(" + (_r1 * 1.5) + "," + _r1 + ")rotate(90)")
        .append("svg:g")
        .attr("transform", "rotate(0)");

      // initialize color palettes
      var n = jobs.length + 2; // colorbrewer index starts at 3
      if (n > 7) n = 7;
      _fill = d3.scale.ordinal().range(colorbrewer.Greys[n]);
      _successFill = d3.scale.ordinal().range(colorbrewer.Greens[n]);
      _errorFill = d3.scale.ordinal().range(colorbrewer.Reds[n]);

      // initialize group angles
      _ga = 2 * Math.PI / jobs.length;
      _gap = _ga * 0.1;
      _ga2 = (_ga - _gap) / 2;

      // localize some utility methods
      var findJobIndexByName = this.ui.findJobIndexByName;
      var findJobByName = this.ui.findJobByName;
      var findJobByIndex = this.ui.findJobByIndex;

      // Add predecessor and successor index maps to all jobs
      jobs.forEach(function (job) {
        job.predecessorIndices = {};
        job.successorIndices = {};
      });

      // Construct a square matrix counting dependencies
      for (var i = -1; ++i < jobs.length;) {
        var row = _matrix[i] = [];
        for (var j = -1; ++j < jobs.length;) {
          row[j] = 0;
        }
      }
      jobs.forEach(function(j) {
        var p = findJobIndexByName(j.name);
        j.successorNames.forEach(function(n) {
          var s = findJobIndexByName(n);
          _matrix[s][p]++;

          // initialize predecessor and successor indices
          j.successorIndices[s] = d3.keys(j.successorIndices).length;
          var sj = findJobByName(n);
          sj.predecessorIndices[p] = d3.keys(sj.predecessorIndices).length;
        });
      });

      // initialize chord diagram with job dependency matrix
      _diagram = d3.layout.chord();
      _diagram.matrix(_matrix);

      // override start and end angles for groups and chords
      _groups = _diagram.groups();
      _chords = _diagram.chords();

      // initialize groups
      for (var i = 0; i < _groups.length; i++) {
        var d = _groups[i];

        // associate group with job
        d.job = jobs[i];

        // angles
        d.startAngle = _groupStartAngle(d);
        d.endAngle = _groupEndAngle(d);
      }

      // initialize begin / end angles for chord source / target
      for (var i = 0; i < _chords.length; i++) {
        var d = _chords[i];
        var s = d.source;
        var t = d.target;

        // associate jobs with chord source and target objects
        var sj = findJobByIndex(s.index);
        var tj = findJobByIndex(t.index);
        s.job = sj;
        t.job = tj;

        // determine chord source and target indices
        var si = sj.predecessorIndices[t.index];
        var ti = tj.successorIndices[s.index];

        // determine chord source out-degree and target in-degree
        var sn = d3.keys(sj.predecessorIndices).length;
        var tn = d3.keys(tj.successorIndices).length;
        s.startAngle = _chordAngle(s, true, si, sn);
        s.endAngle = _chordAngle(s, true, si + 1, sn);
        t.startAngle = _chordAngle(t, false, ti, tn);
        t.endAngle = _chordAngle(t, false, ti + 1, tn);
      }

      // select an svg g element for each group
      var g = _svg.selectAll("g.group")
        .data(_groups)
        .enter()
        .append("svg:g")
        .attr("class", "group");

      // add background arc to each g.group to support mouse interaction
      g.append("svg:path")
        .attr("class", "arc-mouse")
        .style("fill", "white")
        .style("stroke", "white")
        .attr("d", arcMouse)
        .on('mouseover', function(d, i) {
          _handleArcMouseOver.call(self, d, i);
        })
        .on('click', function(d, i) {
          _handleArcClick.call(self, d, i);
        });

      // add visual arc to each g.group
      g.append("svg:path")
        .attr("class", "arc")
        .style("fill", _jobColor)
        .style("stroke", _jobColor)
        .attr("d", arc);

      // add a label to each g.group
      g.append("svg:text")
        .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
          .attr("dy", ".35em")
        .attr("text-anchor", null)
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (_r0 + 26) + ")";
        })
        .text(function(d) { return d.index + 1; });

      // add chords
      _svg.selectAll("path.chord")
        .data(_chords)
        .enter()
        .append("svg:path")
        .attr("class", "chord")
        .style("stroke", _chordStroke)
        .style("fill", _chordFill)
        .attr("d", d3.svg.chord().radius(_r0));
    }