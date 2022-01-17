function(token, compiledContents, compiler, callback) {
  if(!token.parent.tagType || token.parent.tagType.tagName !== 'block') {
    return callback(new Error('Compilation error: `parent` tag must be immediate child of a `block` tag.'));
  }
  
  token.parent.hasParentTag = true;

  callback(null, '__acc.push("{{parent}}");');
}