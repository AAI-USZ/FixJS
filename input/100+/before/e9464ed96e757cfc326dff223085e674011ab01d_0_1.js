function(c) {
    this.color=parseInt(c);    
    this.dom_elem.setAttribute("height",this.dom_h);
    this.dom_elem.setAttribute("width",this.dom_w);
    this.dom_elem.setAttribute("src",imagePath(c,0));
    this.dom_elem.setAttribute("alt"," " + c + " ");
    this.dom_elem.setAttribute("id","i"+this.xpos+"-"+this.ypos);

    if (navigator.appName=="Microsoft Internet Explorer") {  
        this.dom_elem.onclick = new Function('click(' + this.xpos + "," + this.ypos + ')');
    }
    else
        this.dom_elem.setAttribute("onClick","click(" + this.xpos + "," + this.ypos + ")");
    this.unSelect();
}