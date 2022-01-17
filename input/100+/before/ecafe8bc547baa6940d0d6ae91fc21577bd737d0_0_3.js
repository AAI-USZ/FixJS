function(x, y, elem, base, box, content, deltaWidth, deltaHeight, clientRegion, pos)
{
  if (x <= 0 && y <= 0) {
    return [x, y];
  }
  var aborted = false;
  var widthContent = x + elem.offsetWidth;
  var heightContent = y + elem.offsetHeight;
  if (widthContent < 30 && x < 0) {
    x = 30;
    aborted = true;
  } else if ((pos.x + widthContent) > clientRegion.width && x > 0) {
    x = clientRegion.width - elem.offsetWidth - pos.x;
    aborted = true;
  }
  if (heightContent < 30 && y < 0) {
    y = 30;
    aborted = true;
  } else if ((pos.y + heightContent) > clientRegion.height && y > 0) {
    y = clientRegion.height - elem.offsetHeight - pos.y;
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