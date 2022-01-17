function setContent(newContent, type) {
  this.content = this.contentRaw = newContent;
  if(compressJS && type === 'js') {
    this.contentRaw = this.content.toString('utf8');
    try {
      this.content = utils.compressJS(this.content.toString('utf8'));
    } catch (e) {
      console.log("Error compressing file '" + this.meta.mainFile + ":" + e.message);
      this.content = this.contentRaw;
    }
  }
}