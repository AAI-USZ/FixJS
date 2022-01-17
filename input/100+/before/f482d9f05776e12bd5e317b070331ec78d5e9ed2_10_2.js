function(){
                        $(this).draggable("destroy");
                        $("<div class='move_block' contenteditable='false'>").appendTo($(this));
                        $("<div class='close_img' contenteditable='false'>").appendTo($(this));
                        $("<div class='size_up' contenteditable='false'>").appendTo($(this));
                        $("<div class='size_down' contenteditable='false'>").appendTo($(this));
                        $("<div class='resize_block' contenteditable='false'>").appendTo($(this));
                        $(this).attr("contenteditable", "true").addClass("block_border");
                    }