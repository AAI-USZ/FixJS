function md(a, stripParas){

    var h = showdown.makeHtml(a.replace(/(^\s*|\s*$)/,''));

    return stripParas ? h.replace(/<\/?p>/g,'') : h;

  }