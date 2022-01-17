function MathQuill(el) {
  el = $(el);
  pray('el is a single element', el.length === 1);

  var blockId = $(el).attr(mqBlockId);
  if (!blockId) return null;

  var rootBlock = MathElement[blockId];
  return !!rootBlock && rootBlock.jQ[0] === el[0] && rootBlock.publicMathQuillObj;
}