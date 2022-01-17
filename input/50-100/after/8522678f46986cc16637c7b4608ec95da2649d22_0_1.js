function MathQuill(el, dotName) {
  el = $(el);
  if (el.length !== 1) throw 'MathQuill'+(dotName || '')+'() must be passed a\
single element, got to '+el.length+' elements instead';

  var blockId = $(el).attr(mqBlockId);
  if (!blockId) return null;

  var rootBlock = MathElement[blockId];
  return !!rootBlock && rootBlock.jQ[0] === el[0] && rootBlock.publicMathQuillObj;
}