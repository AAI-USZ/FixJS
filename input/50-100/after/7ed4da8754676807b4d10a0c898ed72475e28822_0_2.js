function(rel) {
  if (!rel || typeof rel !== 'object') {
    return false;
  }

  var inRelationship = rel.hasOwnProperty.bind(rel);
  return Seraph.relationshipFlags.every(inRelationship) &&
         typeof rel.data === 'object';
}