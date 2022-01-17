function() {
  if (pv.renderer() == 'svgweb') {
      return pv.vector (pv.event.clientX * 1, pv.event.clientY * 1);
  } else {
      /* Compute xy-coordinates relative to the panel. */
      var x = pv.event.pageX || 0,
          y = pv.event.pageY || 0,
          n = this.root.canvas();
      do {
        x -= n.offsetLeft;
        y -= n.offsetTop;
      } while (n = n.offsetParent);

      /* Compute the inverse transform of all enclosing panels. */
      var t = pv.Transform.identity,
          p = this.properties.transform ? this : this.parent,
          pz = [];
      do { pz.push(p); } while (p = p.parent);
      while (p = pz.pop()) t = t.translate(p.left(), p.top()).times(p.transform());
      t = t.invert();

      return pv.vector(x * t.k + t.x, y * t.k + t.y);
  }
}