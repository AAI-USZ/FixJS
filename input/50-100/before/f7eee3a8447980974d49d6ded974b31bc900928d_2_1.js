function setContent(newContent, type) {
  this.content = this.contentRaw = newContent;
  if(compressJS && type === 'js') {
    this.contentRaw = this.content.toString('utf8');
    this.content = utils.compressJS(this.content.toString('utf8'));
  }
}