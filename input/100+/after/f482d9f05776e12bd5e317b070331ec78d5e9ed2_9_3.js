function(){
        var container = $(this).parent();
        var text_block = $("<div class='text_block'><div class='real_text' contenteditable='true'>" + sankoreLang.new_txt + "</div></div>").appendTo(container);
        $("<div class='move_block' contenteditable='false'>").appendTo(text_block);
        $("<div class='close_img' contenteditable='false'>").appendTo(text_block);
        $("<div class='size_up' contenteditable='false'>").appendTo(text_block);
        $("<div class='size_down' contenteditable='false'>").appendTo(text_block);
        $("<div class='resize_block' contenteditable='false'>").appendTo(text_block);
        text_block.addClass("block_border");
    }