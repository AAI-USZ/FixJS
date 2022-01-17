function() {
            if(img_tag.height<500) {
              img_height = img_tag.height
            }
            else {
              img_height = 500
            }
            if (img_tag.width < 800) {
              img_width = img_tag.width
            }
            else {
              img_width = 800
            }    
            $(img_tag).css({'width':img_width,'height':img_height})
            $('.modal-body').css({'text-align': 'center'})
            $('.modal-body').append($(img_tag))
            spinner.stop()
             $('#myModal').modal('show')
          }