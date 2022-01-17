function() {
    while(this.containerdiv.children.length > 0)
    {
      this.containerdiv.removeChild(0);
    }
    if(!OpenJsCad.isChrome() )
    {
      var div = document.createElement("div");
      div.innerHTML = "Please note: OpenJsCad currently only runs reliably on Google Chrome!";
      this.containerdiv.appendChild(div);
    }
    var viewerdiv = document.createElement("div");
    viewerdiv.className = "viewer";
    viewerdiv.style.width = this.viewerwidth + "px";
    viewerdiv.style.height = this.viewerheight + "px";
    viewerdiv.style.backgroundColor = "rgb(200,200,200)";
    this.containerdiv.appendChild(viewerdiv);
    this.viewerdiv = viewerdiv;
    try
    {
      this.viewer = new OpenJsCad.Viewer(this.viewerdiv, this.viewerwidth, this.viewerheight, this.initialViewerDistance);
    } catch (e) {
//      this.viewer = null;
      this.viewerdiv.innerHTML = "<b><br><br>Error: "+e.toString()+"</b><br><br>OpenJsCad currently requires Google Chrome with WebGL enabled";
//      this.viewerdiv.innerHTML = e.toString();
    }
    this.errordiv = document.createElement("div");
    this.errorpre = document.createElement("pre"); 
    this.errordiv.appendChild(this.errorpre);
    this.statusdiv = document.createElement("div");
    this.statusdiv.className = "statusdiv";
    //this.statusdiv.style.width = this.viewerwidth + "px";
    this.statusspan = document.createElement("span");
    this.statusbuttons = document.createElement("div");
    this.statusbuttons.style.float = "right";
    this.statusdiv.appendChild(this.statusspan);
    this.statusdiv.appendChild(this.statusbuttons);
    this.abortbutton = document.createElement("button");
    this.abortbutton.innerHTML = "Abort";
    var that = this;
    this.abortbutton.onclick = function(e) {
      that.abort();
    };
    this.statusbuttons.appendChild(this.abortbutton);
    this.generateStlButton = document.createElement("button");
    this.generateStlButton.innerHTML = "Generate STL";
    this.generateStlButton.onclick = function(e) {
      that.generateStl();
    };
    this.statusbuttons.appendChild(this.generateStlButton);
    this.downloadStlLink = document.createElement("a");
    this.downloadStlLink.innerHTML = "Download STL";
//    this.downloadStlLink.type = "application/sla";  // mime type for .stl files
    this.statusbuttons.appendChild(this.downloadStlLink);
    this.parametersdiv = document.createElement("div");
    this.parametersdiv.className = "parametersdiv";
    var headerdiv = document.createElement("div");
    headerdiv.innerText = "Parameters:";
    headerdiv.className = "header";
    this.parametersdiv.appendChild(headerdiv);
    this.parameterstable = document.createElement("table");
    this.parameterstable.className = "parameterstable";
    this.parametersdiv.appendChild(this.parameterstable);
    var parseParametersButton = document.createElement("button");
    parseParametersButton.innerHTML = "Update";
    parseParametersButton.onclick = function(e) {
      that.rebuildSolid();
    };
    this.parametersdiv.appendChild(parseParametersButton);
    this.enableItems();    
    this.containerdiv.appendChild(this.statusdiv);
    this.containerdiv.appendChild(this.errordiv);
    this.containerdiv.appendChild(this.parametersdiv);
    this.clearViewer();
  }