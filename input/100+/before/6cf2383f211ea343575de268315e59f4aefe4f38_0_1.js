function (block, content, layout, next) {

  var calipso = require(path.join(rootpath, 'lib/calipso'));
  var cacheKey = calipso.helpers.getCacheKey('block',block,true);

  this.content[block] = this.content[block] || [];
  this.content[block].push(content);

  // If we are caching, then cache it.
  if(this.contentCache[block]) {
    this.cache.set(cacheKey,{content:content,layout:layout},null,next);
  } else {
    next();
  }

}