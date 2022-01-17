function TextLayerClosure() {
  var measureCanvas = document.createElement('canvas');
  var measureCtx = canvas.getContext('2d');

  // Timeout value for rendering one div after the other.
  var renderInterval = 0;
  // Timespan to continue rendering after the last scrolling on the page.
  var scrollRenderTimout = 500; // in ms

  function TextLayer(pageNum, textLayerDiv) {
    this.textLayerDiv = textLayerDiv;
    this.textDivs = [];
    this.renderIdx = 0;
    this.renderTimer = null;
    this.resumeRenderTimer = null;
    this.renderingDone = false;

    this.pageIdx = pageNum - 1;

    this.highlightedIdx = -1;
    this.highlightedOffset = 0;

    this.onScroll = this.onScroll.bind(this);
    this.renderTextLayer = this.renderTextLayer.bind(this);
    this.setupRenderTimer = this.setupRenderTimer.bind(this);
  }

  TextLayer.prototype = {
    setHighlightIdx: function(idx) {
      var self = this;
      var hlIdx = this.highlightedIdx;
      var textDivs = this.textDivs;

      function secureClassList(i, opp) {
        var div = textDivs[i];
        if (!div)
          return;

        if (opp == "add") {
          div.scrollIntoView();
          
          var text = div.textContent;
          var offset = self.highlightedOffset;
          var endIdx = offset + PDFView.searchTerms.length;

          var pre  = text.substring(0, offset);
          var high = text.substring(offset, endIdx);
          var post = text.substring(endIdx);

          var preDom  = document.createTextNode(pre);
          var highDom = document.createElement('span');
          var postDom = document.createTextNode(post);

          highDom.textContent = high;

          // XXX Better do proper removal?
          div.innerHTML = '';
          div.appendChild(preDom);
          div.appendChild(highDom);
          div.appendChild(postDom);
        } else {
          // Remove all highlight spans
          // XXX This is hacky - better idea?
          div.textContent = div.textContent;
        }
      }

      secureClassList(hlIdx, 'remove');
      secureClassList(idx, 'add');

      this.highlightedIdx = idx;
    },

    highlight: function textLayerHighlight(matchIdx) {
      if (matchIdx === -1) {
        this.highlightedOffset = -1;
        this.setHighlightIdx(-1);
      }
      var mapping = PDFView.pageText[this.pageIdx].mapping;
      
      // Find the div where the match starts
      // XXX Convert the linear search to a binary one.
      var i = 0;
      while (i !== mapping.length -1 && matchIdx >= mapping[i+1]) {
        i++;
        if (i == mapping.length) {
          console.error("Could not find matching mapping");
        }
      }
 
      this.highlightedOffset = matchIdx - mapping[i];
      this.setHighlightIdx(i);
    },

    beginLayout: function textLayerBuilderBeginLayout() {
      var textDivs = this.textDivs;
      var textLayerDiv = this.textLayerDiv;
      // Remove available divs.
      for (var i = 0; i < textDivs.length; i++) {
        textLayerDiv.removeChild(textDivs[i]);
      }

      // Reset the variables.
      this.textDivs = [];
      this.renderIdx = 0;
      this.renderingDone = false;
    },

    // Render the text layer, one div at a time
    renderTextLayer: function textLayerRenderTextLayer() { 
      var textDivs = this.textDivs;
      if (this.renderIdx == textDivs.length) { 
        clearInterval(this.renderTimer); 
        this.renderingDone = true;
        window.removeEventListener('scroll', this.textLayerOnScroll, false);
        return;
      }

      var textDiv = textDivs[this.renderIdx];
      this.renderIdx += 1;

      if (textDiv.dataset.textLength > 0) {
        this.textLayerDiv.appendChild(textDiv);

        if (textDiv.dataset.textLength > 1) { // avoid div by zero
          // Adjust div width to match canvas text

          measureCtx.font = textDiv.style.fontSize + ' sans-serif';
          var width = measureCtx.measureText(textDiv.textContent).width;

          var textScale = textDiv.dataset.canvasWidth / width;

          CustomStyle.setProp('transform' , textDiv,
            'scale(' + textScale + ', 1)');
          CustomStyle.setProp('transformOrigin' , textDiv, '0% 0%');
        }
      } // textLength > 0
    },

    setupRenderTimer: function textLayerSetupRenderTimer() {
      this.renderTimer = setInterval(this.renderTextLayer, renderInterval);
    },

    // Stop rendering when user scrolls. Resume after XXX milliseconds
    // of no scroll events
    onScroll: function textLayerOnScroll() {
      // Immediately pause rendering
      clearInterval(this.renderTimer);

      clearTimeout(this.resumeRenderTimer);

      // Resume rendering after some timeout.
      this.resumeRenderTimer = setTimeout(
        this.setupRenderTimer, 
        scrollRenderTimout
      );
    },

    endLayout: function textLayerBuilderEndLayout() {
      var textDivs = this.textDivs;
      var textLayerDiv = this.textLayerDiv;

      this.setupRenderTimer();
      window.addEventListener('scroll', this.onScroll, false);
    },

    appendText: function textLayerBuilderAppendText(text, fontName, fontSize) {
      var textDiv = document.createElement('div');

      // vScale and hScale already contain the scaling to pixel units
      var fontHeight = fontSize * text.geom.vScale;
      textDiv.dataset.canvasWidth = text.canvasWidth * text.geom.hScale;
      textDiv.dataset.fontName = fontName;

      textDiv.style.fontSize = fontHeight + 'px';
      textDiv.style.left = text.geom.x + 'px';
      textDiv.style.top = (text.geom.y - fontHeight) + 'px';
      textDiv.textContent = PDFJS.bidi(text, -1);
      textDiv.dir = text.direction;
      textDiv.dataset.textLength = text.length;
      var len = this.textDivs.push(textDiv);

      if (len - 1 == this.highlightedIdx) {
        this.setHighlightIdx(this.highlightedIdx);
      }
    }
  }

  // 

  return TextLayer;
}