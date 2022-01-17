function setValueByName(ele, val, options) {

  if (val == null) val = "";
  if (options == null) options = {};

  var orig = ele;

  var nodes = document.getElementsByName(orig);
  if (nodes.length >= 1) ele = nodes.item(0);

  if (ele == null) {
	window.alert("setValueByName() can't find an element with name: " + orig + ".");
    return;
  }

  // All paths now lead to some update so we highlight a change
  dwr.util.highlight(ele, options);

  if (dwr.util._isHTMLElement(ele, "select")) {
    if (ele.type == "select-multiple" && dwr.util._isArray(val)) dwr.util._selectListItems(ele, val);
    else dwr.util._selectListItem(ele, val);
    return;
  }

  if (dwr.util._isHTMLElement(ele, "input")) {
    if (ele.type == "radio" || ele.type == "checkbox") {
      if (nodes && nodes.length >= 1) {
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes.item(i);
          if (node.type != ele.type) continue;
          if (dwr.util._isArray(val)) {
            node.checked = false;
            for (var j = 0; j < val.length; j++)
              if (val[j] == node.value) node.checked = true;
          }
          else {
            node.checked = (node.value == val);
          }
        }
      }
      else {
        ele.checked = (val == true);
      }
    }
    else {
    	setDatePickerValue('#' + orig + '-display', val); // hack for datepicker's display
    	ele.value = val;
    }

    return;
  }

  if (dwr.util._isHTMLElement(ele, "textarea")) {
    ele.value = val;
    return;
  }

  // If the value to be set is a DOM object then we try importing the node
  // rather than serializing it out
  if (val.nodeType) {
    if (val.nodeType == 9 /*Node.DOCUMENT_NODE*/) val = val.documentElement;
    val = dwr.util._importNode(ele.ownerDocument, val, true);
    ele.appendChild(val);
    return;
  }

  // Fall back to innerHTML and friends
  if (dwr.util._shouldEscapeHtml(options) && typeof(val) == "string") {
    if (ele.textContent) ele.textContent = val;
    else if (ele.innerText) ele.innerText = val;
    else ele.innerHTML = dwr.util.escapeHtml(val);
  }
  else {
    ele.innerHTML = val;
  }
}