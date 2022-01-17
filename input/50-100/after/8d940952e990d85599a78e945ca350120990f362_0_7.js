function(o) {
      var geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) buffer.push(pathType(geometries[i]));
    }