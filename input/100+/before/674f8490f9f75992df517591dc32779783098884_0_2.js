function(e){
        var touch = e.touches[0];
        var x = touch.pageX;
        if(self.down) {
            e.preventDefault();
            var newvalue = (x-self.startX) + self.startValue;
            self.vars[self.activeID] = newvalue;
            var elem = document.getElementById(self.activeID);
            elem.innerHTML = newvalue;
            self.invokeFunction();
            var popup = $("#"+self.exampleid+" .popup");
            var ppos = $("#"+self.exampleid).offset();
            popup.css("left",(e.pageX-ppos.left-30)+"px");
            popup.get(0).innerHTML = ""+newvalue;
        }
    }