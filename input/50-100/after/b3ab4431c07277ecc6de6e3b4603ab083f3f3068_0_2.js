function(x, y) {
      this.points.push({ x: x, y: y, t: new Date().getTime(), isPoint: true, color: this.color, size: this.size })
      this.updateRecording()
    }