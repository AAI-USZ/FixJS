function(e) {
                var popup = $("#"+exampleid+" .popup");
                var id = $(this).attr("id");
                e.preventDefault();
                var touch = e.touches[0];
                var x = touch.pageX;
                var y = touch.pageY;
                self.startX = x;
                self.startValue = self.vars[id];
                self.down = true;
                self.addListeners();
                self.activeID = id;
                popup.show();
                var ppos = $("#"+exampleid).offset();
                var tpos = $(this).offset();
                popup.css("top",(tpos.top-ppos.top-80)+"px");
                popup.css("left",(x-ppos.left-30)+"px");
                popup.text(""+self.startValue);
            }