function(blocks, filename, comments) {
    this.blocks = blocks;
    this.header = 'define(\'danmakufu/' + filename + '\', function(require) {\n' +
                  'var __functions__ = require(\'Functions\');\n' +
                  'var Container = {};\n' +
                  'Container.__comments__ = ' + JSON.stringify(comments) + ';\n';
    this.footer = 'return Container;\n});';
    this.variables = [];
    this.result = JSBeautify(this.header + this.addJSBlock(0) + this.footer, {
        indent_size: 2,
        keep_array_indentation: true
    });
    console.log(this.result);
}