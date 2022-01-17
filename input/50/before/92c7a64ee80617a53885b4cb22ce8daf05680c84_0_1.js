function(face) {
          face = face.map(project);
          face.push(face[2]);
          return [face];
        }