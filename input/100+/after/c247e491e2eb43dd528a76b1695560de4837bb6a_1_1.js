function render(displayList, renderingContext) {
  var ctx = renderingContext.beginDrawing();
  // displayList is array, so items are sorted by depth
  for (var depth in displayList) {
    var item = displayList[depth];
    if (item) {
      var character = item.character;
      if (item.matrix && !character.$fixMatrix)
        character.matrix = create(item.matrix);
      if (item.cxform && !character.$fixCxform)
        character.cxform = create(item.cxform);

      ctx.save();
      var matrix = character.matrix;
      ctx.transform(
        matrix.scaleX,
        matrix.skew0,
        matrix.skew1,
        matrix.scaleY,
        matrix.translateX,
        matrix.translateY
      );
      var rotation = character.rotation;
      if (rotation)
        ctx.rotate(rotation * Math.PI / 180);
      var cxform = character.cxform;
      if (cxform) {
        // We only support alpha channel transformation for now
        ctx.globalAlpha = (ctx.globalAlpha * cxform.alphaMult + cxform.alphaAdd) / 256;
      }
      if (character.draw)
        character.draw(ctx, character.ratio);
      else if (character.nextFrame)
        character.renderNextFrame(renderingContext);

      ctx.restore();
      if (character.hitTestCache && character.hitTestCache.ratio != character.ratio)
        renderShadowCanvas(character);
    }
  }
  renderingContext.endDrawing();
}