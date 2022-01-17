function(className, element, msg) {
    var el = document.querySelector(element);
    if(el) el.innerText = msg;
    document.body.className = className;
  }