function(params) {
        this.domRoot = document.getElementById("canvas-main"); // params.domElement ||  .body;
        
        if(params.ele) {
            this.ele = params.ele[0];        
        } else {        
            this.ele = document.createElement("div"); 
            this.ele.setAttribute("class","ori-label");
            this.ele.setAttribute("unselectable","on");
            this.domRoot.appendChild(this.ele);
            this.setPosition(params.pos || {x:0, y:0, z:-1});
            this.ele.innerHTML = " ";
            this.setText(params.text);
        }
}