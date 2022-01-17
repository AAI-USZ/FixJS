function(x, y, elem, base, box, content, deltaWidth, deltaHeight, clientRegion, pos, bodyScroll)
{
  if (x <= 0 && y <= 0) {
    return [x, y];
  }
  var aborted = false;
  var widthContent = x + elem.offsetWidth;
  var heightContent = y + elem.offsetHeight;
  if (widthContent < 30 && x < 0) {
    x = bodyScroll.left + 30;
    aborted = true;
  } else if ((pos.x + widthContent - bodyScroll.left) > clientRegion.width && x > 0) {
    x = clientRegion.width - elem.offsetWidth - (pos.x - bodyScroll.left);
    aborted = true;
  }
  if (heightContent < 30 && y < 0) {
    y = bodyScroll.top + 30;
    aborted = true;
  } else if ((pos.y + heightContent - bodyScroll.top) > clientRegion.height && y > 0) {
    y = clientRegion.height - elem.offsetHeight - (pos.y - bodyScroll.top);
    aborted = true;
  }
  if (aborted) {
    return [x, y];
  }
  base.style.width = widthContent + "px";
  box.style.width = widthContent + "px";
  if (box.style.minWidth) {
    box.style.minWidth = widthContent + "px";
  }
  content.style.width = ((widthContent >= deltaWidth)?(widthContent - deltaWidth):0) + "px";
  base.style.height = heightContent + "px";
  box.style.height = heightContent + "px";
  if (box.style.minHeight) {
    box.style.minHeight = heightContent + "px";
  }
  content.style.height = ((heightContent >= deltaHeight)?(heightContent - deltaHeight):0) + "px";
  return [x, y];
}