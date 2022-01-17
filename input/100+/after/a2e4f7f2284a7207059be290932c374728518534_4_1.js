function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<ul>\n  <li><span class=\"right\">";
  stack1 = depth0.version;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><label class=\"left\">Version</label></li>\n  <li><a href=\"";
  stack1 = depth0.repository;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" class=\"share\"><span></span>Repository <span class=\"light\">";
  stack1 = depth0.repository;
  foundHelper = helpers['format-url'];
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "format-url", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span></a></li>\n</ul>\n";
  return buffer;}