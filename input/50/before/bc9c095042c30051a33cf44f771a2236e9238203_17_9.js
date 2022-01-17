function(e){
                if ($openPopover.length){
                    $openPopover.prev().removeClass("selected");
                    $openPopover.attr("aria-hidden", "true");
                    $openPopover.hide();
                    $openPopover = false;
                }
            }