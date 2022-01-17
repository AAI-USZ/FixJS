function() {      
      var pg = 
        (self.ispage) ?
        {
          w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),
          h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)
        } 
        : (self.haswrapper) ?
        {
          w:self.doc.outerWidth()+parseInt(self.win.css('paddingLeft'))+parseInt(self.win.css('paddingRight')),
          h:self.doc.outerHeight()+parseInt(self.win.css('paddingTop'))+parseInt(self.win.css('paddingBottom'))
        } 
        : (self.iframe) ?
        {
          w:Math.max(self.iframe.html.scrollWidth,self.iframe.body.scrollWidth),
          h:Math.max(self.iframe.html.scrollHeight,self.iframe.body.scrollHeight)
        }        
        :
        {
          w:self.docscroll[0].scrollWidth,
          h:self.docscroll[0].scrollHeight
        };
      return pg;
    }