function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul>\n  <li><span class=\"right\">";
  stack1 = depth0.version;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><label class=\"left\">Version</label></li>\n</ul>\n";
  return buffer;}