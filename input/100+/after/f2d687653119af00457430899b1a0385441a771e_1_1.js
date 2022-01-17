function nextprev(do_prev) {
    if (do_prev == undefined)
        do_prev = false
    //page just get loaded
    if (current == null) {
        if (window.location.hash == "") {
            img_lnk = $(".visio_img:first")
        } else {
            id = ""+window.location.hash.substring(1)+""
            
            if (id == "last")
                img_lnk = $(".visio_img:last")
            else if (id == "first")
                img_lnk = $(".visio_img:first")
            else
                img_lnk = $(".visio_img[rel = '"+id+"']")
        }
    } else {
        found = false
        found_on_prev = false
        img_next = undefined
        img_prev = undefined
        $(".visio_img").each(function() {
            if (found_on_prev) {
                img_next = $(this)
                found_on_prev = false
            }
            
            if ($(this).attr("rel") == current.attr("rel")) {
                found = true
                found_on_prev = true
            }
            
            if (!found)
                img_prev = $(this)
        })
        
        img_lnk = do_prev ? img_prev : img_next
        
        if (img_lnk == undefined) {
            
            if (do_prev)
                img_lnk = $(".page_previ")
            else
                img_lnk = $(".page_nexti")
            
            if (img_lnk.attr("href") == undefined)
                alert("no more page!")
            else 
                window.location = img_lnk.attr("href") + (do_prev ? "#last" : "#first")
            
            return
        }
    }
    
    img_lnk.first().click()
    current = img_lnk
}