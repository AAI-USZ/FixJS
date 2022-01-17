function() {
  var x = (pv.renderer() == 'svgweb' ? pv.event.clientX * 1 : pv.event.pageX) || 0,
      y = (pv.renderer() == 'svgweb' ? pv.event.clientY * 1 : pv.event.pageY) || 0,
      n = this.root.canvas();

      /* Compute xy-coordinates relative to the panel.
       * This is not necessary if we're using svgweb, as svgweb gives us
       * the necessary relative co-ordinates anyway (well, it seems to
       * in my code.
       */
      if (pv.renderer() != 'svgweb') {
          do {
            x -= n.offsetLeft;
            y -= n.offsetTop;
          } while (n = n.offsetParent);
      }

      /* Compute the inverse transform of all enclosing panels. */
      var t = pv.Transform.identity,
          p = this.properties.transform ? this : this.parent,
          pz = [];
      do { pz.push(p); } while (p = p.parent);
      while (p = pz.pop()) t = t.translate(p.left(), p.top()).times(p.transform());
      t = t.invert();
      return pv.vector(x * t.k + t.x, y * t.k + t.y);
}