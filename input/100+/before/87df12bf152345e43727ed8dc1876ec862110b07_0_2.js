function() {
            img_height = img_tag.height
            img_width = img_tag.width
            $('.modal').css({'width': img_width, 'margin-left':-(img_width/2),'margin-top':-(img_height/2)})
            $('.modal-body').css({'max-height': img_height})
            $('.modal-body').append("<img src='" + img_tag.src+"'/>")
            $('#myModal').modal('show')
          }