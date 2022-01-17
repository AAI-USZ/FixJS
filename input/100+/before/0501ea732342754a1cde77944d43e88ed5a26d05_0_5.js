function(file, requestQuery) {
  var html = new Element("html"),
    head = new Element("head"),
    body = new Element("body"),
    initScript = new Element("script");
    apiScript = new Element("script"),
    contentType = new Element("meta");

  contentType.setAttribute("http-equiv", "Content-Type" );
  contentType.setAttribute("content", "text/html; charset=utf-8");
  head.append(contentType);


  if(requestQuery.device !== undefined && requestQuery.version !== undefined) {
    var viewport = new Element("meta");
    viewport.setAttribute("name", "viewport");
    viewport.setAttribute("content", "width=device-width, height=device-height, user-scalable=no");
    apiScript.setAttribute("src", "http://" + 
      this.domain + "/static/mac/script/" + 
      requestQuery.device + "_" + 
      requestQuery.version + "/167-scripts.js");

    head.append(viewport);
  }
  else {
    apiScript.setAttribute("src", "https://" + this.domain + "/static/pec/script/studio/155-scripts.js");
  }

  initParams.widget.guid = this.guid;
  initParams.widget.instance = this.guid;

  initScript.append("$fhclient = $fh.init(" + JSON.stringify(initParams) + ");");

  body.setAttribute("style", "margin:0px;padding:0px");

  head.append(apiScript);
  head.append(initScript);
  body.append(file);
  html.append(head);
  html.append(body);

  return "<!doctype html>" + html.toString();
}