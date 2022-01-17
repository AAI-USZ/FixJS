function getX(len) {
        measure.innerHTML = "<pre><span>" + lineObj.getHTML(makeTab, len) + "</span></pre>";
        return measure.firstChild.firstChild.offsetWidth;
      }