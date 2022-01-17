function(hideFunction) {
            $(document).unbind("click");
            $(document).bind("click", function(event){ //hides the tooltip if an element clicked on or any of its parents has the notthide property
                for (var target = event.target; target != null; target=target.parentElement){
                    if ($(target).attr("notthide") != null)
                        return;
                }
                hideFunction();
            });
        }