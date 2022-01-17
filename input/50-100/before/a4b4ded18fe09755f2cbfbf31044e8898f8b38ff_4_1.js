function(blocks, filename) {
    this.blocks = blocks;
    this.header = 'define(\'danmakufu/' + filename + '\', function(require) {\n' +
                  'var __functions__ = require(\'Functions\');\n' +
                  'var Container = {};\n'
    this.footer = 'return Container;\n});';
    this.variables = [];
    this.result = JSBeautify(this.header + this.addJSBlock(0) + this.footer, {
        indent_size: 2,
        keep_array_indentation: true
    });
    console.log(this.result);
}