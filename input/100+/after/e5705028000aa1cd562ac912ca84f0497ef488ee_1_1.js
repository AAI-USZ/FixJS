function(tag, content, htmlOptions) {
    if(!tag) {
      return;
    }
    if(!content) {
      content = '';
    }
    htmlOptions = htmlOptions || {};

    var selfClosing = (tag in this.selfClosingTags) ? this.selfClosingTags[tag] : undefined
      , tagOptions;

    if(selfClosing) {
      htmlOptions[selfClosing.content] = htmlOptions[selfClosing.content] || content || false;
    }
    if(tag === 'a') {
      htmlOptions.href = htmlOptions.href || content;
    }
    if(tag === 'img') {
      htmlOptions.alt = htmlOptions.alt === '' ? htmlOptions.alt : htmlOptions.alt || content;
    }
    tagOptions = this.tagOptions(htmlOptions);

    content = this.preContentStrings[tag] ?
      this.preContentStrings[tag] + content :
      content;

    if(selfClosing) {
      return '<'+tag+tagOptions+' />';
    } else {
      return '<'+tag+tagOptions+'>' + content + '</'+tag+'>';
    }
  }