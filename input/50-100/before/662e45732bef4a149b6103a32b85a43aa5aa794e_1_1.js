function(){
                var img_clone = $(this).clone();
                $(img_clone).lightbox_me({destroyOnClose: true, centered: true, overlaySpeed: 0, lightboxSpeed: 300});//not going to chain that would get ugly
                $(img_clone).click(function(){ $(this).trigger('close'); });
            }