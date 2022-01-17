function(rel) {
  var inRelationship = rel.hasOwnProperty.bind(rel);
  return  typeof rel === 'object' &&
          Seraph.relationshipFlags.every(inRelationship) &&
          typeof rel.data === 'object';
}