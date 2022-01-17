function showTimeShift(graphId, show) {
    var graph = $("#" + graphId);
    var src = graph.attr("src");
    if ((src.indexOf("graph.php") != 0) &&
        (src.indexOf("./graph.php") != 0))
      return;
    var paramStr = "&ts=1";
    var d = new Date();
    paramStr += "&_=" + d.getTime();
    src = jQuery.param.querystring(src, paramStr);
    graph.attr("src", src);
  }