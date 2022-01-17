function (levels, sample, diff, maybe, spectrum, peaks, histogram, beat) {
    var that = this;
    var n = this.n;

    if (this.g) {
      var out = [ '<strong>' + Math.round(beat.bpm * 10) / 10 + ' BPM (' + (Math.round(100 * beat.confidence)) + '%) ' + Math.round(beat.permanence * 100) + '</strong>' ];
      _.each(histogram, function (peak) {
        var bpm = Math.round(that.offsetToBPM(peak.offset) * 10) / 10;
        out.push([bpm, ' bpm - ', Math.round(peak.offset * 10) / 10, ' ', Math.round(peak.fraction * 100) / 100, ' - %: ', Math.round(peak.strength * 100), ' - p: ', Math.round(peak.permanence * 100)].join(''));
      });
      this.t.innerHTML = out.join('<br>');

      var g = this.g;

      // Draw graph bg
      g.fillStyle = '#000000';
      g.fillRect(0, 140, 512, 100);

      // Draw spectrum
      var max = 0;
      for (var i = 2; i < n/8; ++i) {
        max = Math.max(spectrum[i], max);
      }
      var norm = 1/max;
      g.beginPath();
      g.moveTo(0, 200);
      for (var i = 2; i < n/8; ++i) {
        g.lineTo((i-2)*8, 240-(spectrum[i]*norm)*100);
      }
      g.strokeStyle = '#ffffff';
      g.stroke();

      // Highlight peaks
      _.each(histogram, function (peak) {
        var alpha = peak.strength *.5 + .5;
        var active = peak.active ? '255' : '0';
        g.fillStyle = 'rgba(255,'+active+',0,'+ alpha +')';
        g.fillRect((peak.offset - 2) * 8, 140, 1, 100);
      })

      // Plot levels voiceprint
      var i = this.i;
      var j = 0;
      function plot(l) {
        l = Math.round(Math.max(0, Math.min(255, l * 255)));
        g.fillStyle = 'rgb(' + [l,l,l].join(',') + ')';
        g.fillRect(i, j, 1, 20)
        j += 20;
      }
      plot(levels[0]);
      plot(levels[1]);
      plot(levels[2]);
      plot(levels[3]);

      // Show beats
      if (beat.is) {
        g.fillStyle = beat.missed ? 'rgba(255,0,0,.5)'
                      : (beat.predicted ? 'rgba(255,180,0,.5)' : 'rgba(30,180,0,.5)');
        g.fillRect(this.i, 0, 1, 100)
      }
      var c = Math.round(Math.max(0, Math.min(255, beat.was * 255)));
      g.fillStyle = 'rgb('+c+','+c+','+c+')';
      g.fillRect(412, 240, 100, 100)

      // Show maybe beats
      if (beat.maybe) {
        g.fillStyle = beat.predicted ? 'rgba(100,0,230,.5)' : 'rgba(0,180,255,.5)';
        g.fillRect(this.i, 0, 1, 100)
      }

      // Show sample
      if (sample) {
        sample = Math.floor(Math.max(0, Math.min(1, sample)) * 255);
        g.fillStyle = 'rgba(0,'+sample+',' + sample +',1)';
        g.fillRect(this.i, 80, 1, 20)
      }

      // Show diff
      if (diff) {
        diff = Math.floor(Math.max(0, Math.min(1, diff)) * 255);
        g.fillStyle = 'rgba('+diff+',0,' + diff +',1)';
        g.fillRect(this.i, 100, 1, 20)
      }

      // Show maybe
      if (maybe) {
        maybe = Math.floor(Math.max(0, Math.min(1, maybe)) * 255);
        g.fillStyle = 'rgba('+maybe+',' + maybe +',0,1)';
        g.fillRect(this.i, 120, 1, 20)
      }

      this.i = (i + 1) % 512;

    }
  }