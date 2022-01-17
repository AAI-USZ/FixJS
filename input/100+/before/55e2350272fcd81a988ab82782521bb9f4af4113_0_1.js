function(source) {
      var alt, closest, distance, neighbour, previous, vertex, vertices, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2;
      vertices = this.vertices();
      distance = {};
      previous = {};
      for (_i = 0, _len = vertices.length; _i < _len; _i++) {
        vertex = vertices[_i];
        distance[vertex] = Infinity;
        previous[vertex] = null;
      }
      distance[source] = 0;
      while (vertices.length) {
        closest = vertices[0];
        _ref1 = vertices.slice(1);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          neighbour = _ref1[_j];
          if (distance[neighbour] < distance[closest]) {
            closest = neighbour;
          }
        }
        if (distance[closest] === Infinity) {
          break;
        }
        vertices.splice(vertices.indexOf(closest), 1);
        _ref2 = this.neighbours[closest];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          neighbour = _ref2[_k];
          if (vertices.indexOf(neighbour === -1)) {
            continue;
          }
          alt = distance[closest] + this.distanceBetween(closest, neighbour);
          if (alt < distance[neighbour]) {
            distance[neighbour] = alt;
            previous[neighbour] = closest;
          }
        }
      }
      return distance;
    }