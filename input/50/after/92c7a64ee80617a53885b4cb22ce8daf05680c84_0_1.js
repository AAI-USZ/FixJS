function(face) {
          face = face.map(project);
          face.push(face[0]);
          return [face];
        }