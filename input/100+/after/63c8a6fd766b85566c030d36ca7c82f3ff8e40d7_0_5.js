function createTemplateSource(t, options) {
  var str = '',
      p;

  str += ';(function(root) {\n';
  str += '\troot.' + t.name + ' = {\n';

  str += '\t\ttemplate: new Hogan.Template(' + t.template + '),\n';
  str += '\t\tpartials: {\n';
  for (p in t.partials) {
    str += '\t\t\t' + p + ': new Hogan.Template(' + t.partials[p] + '),\n';
  }
  str += '\t\t},\n';
  str += '\t\trender: function(context){\n';
  str += '\t\t\treturn this.template.render(context, this.partials);\n';
  str += '\t\t}\n';

  str += '\t};\n';
  str += '})( this.' + options.namespace + ' || this);\n';

  if (options.debug) str += 'console.log("template: ' + t.name + ' loaded");\n';

  if (options && options.compress) {
    var jsp = require("uglify-js").parser,
        pro = require("uglify-js").uglify,
        ast = jsp.parse(str); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    str = pro.gen_code(ast); // compressed code here
  }

  // t.partials = null;
  t.template = str;
  return t;
}