function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul>\n  <li><a href=\"/settings/about\" class=\"arrow\"><span></span>About</a></li>\n</ul>\n\n<ul>\n  <li><span class=\"right\">";
  stack1 = depth0.user;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span><label class=\"left\">User</label></li>\n</ul>\n\n<a href=\"/logout\" class=\"button red expand\">Logout</a>\n";
  return buffer;}