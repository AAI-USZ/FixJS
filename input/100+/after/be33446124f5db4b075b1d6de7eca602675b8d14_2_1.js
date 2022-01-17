function(url, callback, charset) {
    var isCSS = IS_CSS_RE.test(url)
    var node = document.createElement(isCSS ? 'link' : 'script')

    if (charset) {
      var cs = util.isFunction(charset) ? charset(url) : charset
      cs && (node.charset = cs)
    }

    assetOnload(node, callback || noop)

    if (isCSS) {
      node.rel = 'stylesheet'
      node.href = url
    }
    else {
      node.async = 'async'
      node.src = url
    }

    // For some cache cases in IE 6-9, the script executes IMMEDIATELY after
    // the end of the insertBefore execution, so use `currentlyAddingScript`
    // to hold current node, for deriving url in `define`.
    currentlyAddingScript = node

    // ref: #185 & http://dev.jquery.com/ticket/2709
    baseElement ?
        head.insertBefore(node, baseElement) :
        head.appendChild(node)

    currentlyAddingScript = null
  }