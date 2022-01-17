function(err, subMovie) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    subMovie.attr({
      x: 100,
      y: 100,
      origin: new Point(50, 50)
    }).addTo(stage);
    tools.forEach(stage.children(), function(child) {
      child.animate('4s', {
        rotation: Math.PI * 2
      }, {
        repeat: Infinity
      })
    });
    new Bitmap('redpanda.jpg', function(err) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      this.addTo(stage).attr({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        opacity: 0
      }).animate('.5s', {
        opacity: 1
      });
    });
  }