f    {
      return {
        x: parseInt(c.x * xscale, 10),
        y: parseInt(c.y * yscale, 10),
        x2: parseInt(c.x2 * xscale, 10),
        y2: parseInt(c.y2 * yscale, 10),
        w: parseInt(c.w * xscale, 10),
        h: parseInt(c.h * yscale, 10)
      };
    }
