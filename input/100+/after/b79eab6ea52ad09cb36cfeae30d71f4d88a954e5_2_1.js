function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var __jade = [{ lineno: 1, filename: undefined }];
try {
var buf = [];
with (locals || {}) {
var interp;
__jade.unshift({ lineno: 1, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<li');
buf.push(attrs({ 'data-model-id':("" + (id) + ""), "class": ("" + (completed) + "") }, {"class":true,"data-model-id":true}));
buf.push('>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
buf.push('<div class="view">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
if ((completed))
{
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
__jade.unshift({ lineno: 4, filename: __jade[0].filename });
buf.push('<input type="checkbox" checked="checked" class="toggle"/>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<input type="checkbox" class="toggle"/>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
buf.push('<label>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</label>');
__jade.shift();
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push('<button class="destroy">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('</div>');
__jade.shift();
__jade.unshift({ lineno: 9, filename: __jade[0].filename });
buf.push('<input');
buf.push(attrs({ 'value':("" + (title) + ""), "class": ('edit') }, {"value":true}));
buf.push('/>');
__jade.shift();
__jade.shift();
buf.push('</li>');
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
};
}