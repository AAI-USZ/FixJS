function(e, link)
    {
    var width = 400, height = 300, 
      cls = link.className, match;

    if (cls.indexOf('dim') > -1)
      {
      match = new RegExp('dim(\\d+)x(\\d+)').exec(cls);
      width = match[1];
      height = match[2];
      }

    boxing_request.load(e, link.getAttribute('href'), width, height);
    }