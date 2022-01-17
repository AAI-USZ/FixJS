function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  foundHelper = helpers.attributes;
  stack1 = foundHelper || depth0.attributes;
  tmp1 = self.program(4, program4, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n<div class=\"step\" data-x=\"";
  foundHelper = helpers['x'];
  stack1 = foundHelper || depth0['x'];
  foundHelper = helpers.scaleX;
  stack2 = foundHelper || depth0.scaleX;
  tmp1 = self.program(5, program5, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-y=\"";
  foundHelper = helpers['y'];
  stack1 = foundHelper || depth0['y'];
  foundHelper = helpers.scaleY;
  stack2 = foundHelper || depth0.scaleY;
  tmp1 = self.program(7, program7, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  foundHelper = helpers.rotateX;
  stack1 = foundHelper || depth0.rotateX;
  stack2 = helpers['if'];
  tmp1 = self.program(9, program9, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  foundHelper = helpers.rotateY;
  stack1 = foundHelper || depth0.rotateY;
  stack2 = helpers['if'];
  tmp1 = self.program(12, program12, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  foundHelper = helpers.rotateZ;
  stack1 = foundHelper || depth0.rotateZ;
  stack2 = helpers['if'];
  tmp1 = self.program(15, program15, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  foundHelper = helpers['z'];
  stack1 = foundHelper || depth0['z'];
  stack2 = helpers['if'];
  tmp1 = self.program(18, program18, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  foundHelper = helpers.impScale;
  stack1 = foundHelper || depth0.impScale;
  stack2 = helpers['if'];
  tmp1 = self.program(20, program20, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n<div style=\"width: 1024px; height: 768px\">\n";
  foundHelper = helpers.components;
  stack1 = foundHelper || depth0.components;
  tmp1 = self.program(22, program22, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "data-rotate-x=\"";
  foundHelper = helpers.rotateX;
  stack1 = foundHelper || depth0.rotateX;
  foundHelper = helpers.toDeg;
  stack2 = foundHelper || depth0.toDeg;
  tmp1 = self.program(10, program10, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "data-rotate-y=\"";
  foundHelper = helpers.rotateY;
  stack1 = foundHelper || depth0.rotateY;
  foundHelper = helpers.toDeg;
  stack2 = foundHelper || depth0.toDeg;
  tmp1 = self.program(13, program13, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "data-rotate-z=\"";
  foundHelper = helpers.rotateZ;
  stack1 = foundHelper || depth0.rotateZ;
  foundHelper = helpers.toDeg;
  stack2 = foundHelper || depth0.toDeg;
  tmp1 = self.program(16, program16, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-z=\"";
  foundHelper = helpers['z'];
  stack1 = foundHelper || depth0['z'];
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "z", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-scale=\"";
  foundHelper = helpers.impScale;
  stack1 = foundHelper || depth0.impScale;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "impScale", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n";
  stack1 = depth0;
  foundHelper = helpers.renderComponent;
  stack2 = foundHelper || depth0.renderComponent;
  tmp1 = self.program(23, program23, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}
function program23(depth0,data) {
  
  var buffer = "";
  return buffer;}

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<script>\nvar interval = ";
  stack1 = depth0;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, ".", { hash: {} }); }
  buffer += escapeExpression(stack1) + ";\nif (interval >= 1000) {\n    setInterval(function() {\n        impress().next();\n    }, interval);\n}\n</script>\n";
  return buffer;}

  buffer += "<head>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=1024\" />\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />\n<title>Preview</title>\n\n<meta name=\"description\" content=\"TODO\" />\n<meta name=\"author\" content=\"TODO\" />\n\n<style>\n.componentContainer {\n    position: absolute;\n    -webkit-transform-origin: 0 0;\n    -moz-transform-origin: 0 0;\n    transform-origin: 0 0;\n}\n\n.bg {\n    width: 100%;\n    height: 100%;\n}\n</style>\n<link href=\"preview_export/css/main.css\" rel=\"stylesheet\" />\n<link href='preview_export/css/web-fonts.css' rel='stylesheet' type='text/css'>\n\n<link rel=\"shortcut icon\" href=\"favicon.png\" />\n<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\" />\n</head>\n  <body class=\"impress-not-supported\">\n\n<!-- This is a work around / hack to get the user's browser to download the fonts \n if they decide to save the presentation. -->\n<div style=\"visibility: hidden; width: 0px; height: 0px\">\n<img src=\"/Content/fonts/Lato-Bold.woff\" />\n<img src=\"/Content/fonts/HammersmithOne.woff\" />\n<img src=\"/Content/fonts/Gorditas-Regular.woff\" />\n<img src=\"/Content/fonts/FredokaOne-Regular.woff\" />\n<img src=\"/Content/fonts/Ubuntu.woff\" />\n<img src=\"/Content/fonts/Ubuntu-Bold.woff\" />\n<img src=\"/Content/fonts/PressStart2P-Regular.woff\" />\n<img src=\"/Content/fonts/Lato-BoldItalic.woff\" />\n<img src=\"/Content/fonts/brilFatface-Regular.woff\" />\n<img src=\"/Content/fonts/Lato-Regular.woff\" />\n</div>\n\n<div class=\"fallback-message\">\n    <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a simplified version of this presentation.</p>\n    <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>\n</div>\n <a href=\"#\">Preview mode</a> \n  \n<div class=\"bg\" style=\"";
  foundHelper = helpers.background;
  stack1 = foundHelper || depth0.background;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.styles);
  foundHelper = helpers.extractBG;
  stack2 = foundHelper || depth0.extractBG;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack2 === functionType) { stack1 = stack2.call(depth0, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n<div id=\"impress\">\n\n";
  foundHelper = helpers.slides;
  stack1 = foundHelper || depth0.slides;
  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.models);
  tmp1 = self.program(3, program3, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</div>\n<div class=\"hint\">\n    <p>Use a spacebar or arrow keys to navigate</p>\n</div>\n<script>\nif (\"ontouchstart\" in document.documentElement) { \n    document.querySelector(\".hint\").innerHTML = \"<p>Tap on the left or right to navigate</p>\";\n}\n</script>\n\n";
  foundHelper = helpers.interval;
  stack1 = foundHelper || depth0.interval;
  tmp1 = self.program(25, program25, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack1 === functionType) { stack1 = stack1.call(depth0, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<script type=\"text/javascript\" src=\"/scripts/preview/impress.js\">\n</script>\n<script>\nif (!window.impressStarted) {\n    startImpress(document, window);\n    impress().init();   \n}\n</script>\n</body>";
  return buffer;}