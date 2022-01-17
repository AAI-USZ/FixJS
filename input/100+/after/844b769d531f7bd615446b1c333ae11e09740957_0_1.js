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

            function clickHandler () {
                $(document).bind("mousedown", handler);
                $("."+ct.scroll).show();
                //ie f*cking hack
                $("."+ct.scroll + " " + ct.elements).show();

                var $menu = $self.find("."+ct.menu);
                $menu.prettyScrollResize();
            }

            $self.find( "." + ct.button).click(clickHandler);
            $push.mouseup(clickHandler);
            $push.keyup(
                function(){
                    ct.updateByContext(this, $self );
                }
            );
            ct.updateByContext($push.get(0), $self );

            $("."+ct.scroll).css({
                "position":"absolute"
            }).hide();

        }