function boxEdgeLength(i, j) {
    edge = new THREE.Vector3().sub(
      toCanvasCoords(boundbox.geometry.vertices[axesindicies[i][j][0]]),
      toCanvasCoords(boundbox.geometry.vertices[axesindicies[i][j][1]])
    );
    return edge.length();
  }