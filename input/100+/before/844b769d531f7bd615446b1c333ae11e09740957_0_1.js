function(){
            var $self = $(this);
            var $push = $self.find("."+ct.push);

            $("." + ct.menu).prettyScroll(ct.scrolloptions);
            var handler = function (e) {
                var h = $("." + ct.scroll);
                if(h.has( $(e.target)).length == 0 ){
                    h.hide();
                    $(document).unbind("mousedown", handler);
                }
            };
            $push.mouseup(
                    function () {
                        $(document).bind("mousedown", handler);
                        $("."+ct.scroll).show();
                    }
            );
            $push.keyup(
                function(){
                    ct.updateByContext(this, $self );
                }
            );
            ct.updateByContext($push.get(0), $self );

            $("."+ct.scroll).css({
                "position":"absolute"
            });
            $("."+ ct.scroll).hide();

        }