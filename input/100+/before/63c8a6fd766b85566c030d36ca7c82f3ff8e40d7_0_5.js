function createTemplateSource(t, options) {
  var str = '',
      p;
  str += 'var ' + options.namespace + ' = ' + options.namespace + ' || {};\n';
  str += options.namespace + '.' + t.name + ' = {\n';
  str += '\ttemplate: new Hogan.Template(' + t.template + '),\n';
  str += '\tpartials: {\n';
  for (p in t.partials) {
    str += '\t\t' + p + ': new Hogan.Template(' + t.partials[p] + '),\n';
  }
  str += '\t},\n';
  str += '\trender: function(context){\n';
  str += '\t\treturn this.template.render(context, this.partials);\n';
  str += '\t}\n';
  str += '};\n';

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