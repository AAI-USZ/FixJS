function(){
            var txt_block = new Object();
            txt_block.top = $(this).position().top;
            txt_block.left = $(this).position().left;
            txt_block.h = $(this).height();
            txt_block.w = $(this).width();
            txt_block.fz = $(this).css("font-size");
            txt_block.val = $(this).find(".real_text").html();
            cont_obj.text.push(txt_block);
        }