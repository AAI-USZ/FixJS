function(node){document.body.removeChild(node);},loadCSS:function(filename,oldnode){if(oldnode)
var css=oldnode;else
var css=joDOM.create('link');css.rel='stylesheet';css.type='text/css';css.href=filename+(jo.debug?("?"+joTime.timestamp()):"");if(!oldnode)
document.body.appendChild(css);return css;}