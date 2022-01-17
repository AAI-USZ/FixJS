function(x, y, contents) {
        $tooltip.css({
            top: y + 10,
            left: x + 10,
        });
        if(contents.key !== cur_key){
            cur_key = contents.key;
            $tooltip.html(contents.msg);
        }
        if(!tooltipvisible){
            tooltipvisible = true;
            $tooltip.stop(true, true).fadeIn(200);
        }
    }