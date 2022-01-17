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
__jade.shift();
__jade.unshift({ lineno: 2, filename: __jade[0].filename });
if ((completed > 0 || remaining > 0))
{
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
__jade.unshift({ lineno: 3, filename: __jade[0].filename });
buf.push('<footer id="footer">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 5, filename: __jade[0].filename });
buf.push('<span id="todo-count">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('<strong>');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 6, filename: __jade[0].filename });
buf.push('' + escape((interp = remaining) == null ? '' : interp) + '');
__jade.shift();
__jade.shift();
buf.push('</strong>');
__jade.shift();
__jade.unshift({ lineno: 7, filename: __jade[0].filename });
if ((remaining === 1))
{
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
__jade.unshift({ lineno: 8, filename: __jade[0].filename });
buf.push(' item left');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
__jade.unshift({ lineno: 10, filename: __jade[0].filename });
buf.push(' items left');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
buf.push('</span>');
__jade.shift();
__jade.unshift({ lineno: 12, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 13, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 14, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 15, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 16, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 17, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 18, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
__jade.shift();
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('<button id="clear-completed">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.unshift({ lineno: 19, filename: __jade[0].filename });
buf.push('Clear completed (' + escape((interp = completed) == null ? '' : interp) + ')');
__jade.shift();
__jade.shift();
buf.push('</button>');
__jade.shift();
__jade.shift();
buf.push('</footer>');
__jade.shift();
__jade.shift();
}
else
{
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
__jade.unshift({ lineno: 21, filename: __jade[0].filename });
buf.push('<footer id="footer" style="display: none;">');
__jade.unshift({ lineno: undefined, filename: __jade[0].filename });
__jade.shift();
buf.push('</footer>');
__jade.shift();
__jade.shift();
}
__jade.shift();
__jade.shift();
}
return buf.join("");
} catch (err) {
  rethrow(err, __jade[0].filename, __jade[0].lineno);
}
};
}