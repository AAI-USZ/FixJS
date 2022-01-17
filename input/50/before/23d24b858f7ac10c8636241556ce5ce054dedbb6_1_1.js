function(e) {
        var self    = this,
            $tgt    = $(e.target);

        e.stopPropagation();

        console.log("drag drop: src[", $src.attr('class'), "]");
    }