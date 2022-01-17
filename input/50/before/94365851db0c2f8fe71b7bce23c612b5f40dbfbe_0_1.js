function() {
    return "javascript:void(function(){ if(window.location.host.match(/makr/)){alert('Drag the \"Remix\" button to your bookmarks bar to easily remix any photo while you browse the web!');return};\
    if(document.getElementsByTagName('head').length ==0){document.getElementsByTagName('html')[0].appendChild(document.createElement('head'))} \
    var head= document.getElementsByTagName('head')[0]; \
    var script= document.createElement('script'); \
    script.type= 'text/javascript'; \
    script.src= '" + document.location.origin +  "/bookmarklet.js'; \
    script.id= 'makrio-bm-script'; \
    script.setAttribute('data-origin','" + document.location.origin + "'); \
    head.appendChild(script);}());";
  }