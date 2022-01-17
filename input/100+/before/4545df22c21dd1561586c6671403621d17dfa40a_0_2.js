function isDomElementVisible(obj) {
  if (!obj) return false

  var rect = obj.getBoundingClientRect()
  var padding = 200
  var x = rect.left + (rect.width / 2)
  var y = rect.top + (rect.height / 2)


  var elem = document.elementFromPoint(x, y)
  if (!elem) return false

  if (elem == obj) return true
  if (elem.parentNode && elem.parentNode == obj) return true
  if (elem.firstChild && elem.firstChild == obj) return true

  for (var i = 0; i < elem.children.length; i++)
  if (elem[i] == obj) return true;

  i = 0
  while (i < 10) {
    var rectElem = elem.getBoundingClientRect()
    if (rectElem.top < rect.top + padding && rectElem.left < rect.left + padding && elem.parentNode && elem != document.body && elem != document) {
      if (elem.parentNode == obj) return true;
    } else {
      break;
    }

    elem = elem.parentNode
    i++;
  }

  return false;
}