function(e) {
      $('.modal-body').html('')
      var img_id = $(e.target).attr("data-id")
      var img_height
      var img_width
      var img_tag = new Image()
      for(var i=0;i<id_url.length;i++) {
        if(img_id==id_url[i].id) {
          img_tag.src = id_url[i].img_url
          console.log(id_url[i].img_url)
          $(img_tag).load(function() {
            img_height = img_tag.height
            img_width = img_tag.width
            $('.modal').css({'width': img_width, 'margin-left':-(img_width/2),'margin-top':-(img_height/2)})
            $('.modal-body').css({'max-height': img_height})
            $('.modal-body').append("<img src='" + img_tag.src+"'/>")
            $('#myModal').modal('show')
          })
        }
      }
    }