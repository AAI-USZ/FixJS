function(className, element, msg) {
    var element = document.querySelector(element);
    if(element) element.innerText = msg;
    document.body.className = className;
  }