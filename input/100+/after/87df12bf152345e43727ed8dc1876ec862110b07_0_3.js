function(e) {
      $('.modal-body').html('')
      spinner.spin($('#spinmodal')[0])
      var img_id = $(e.target).attr("data-id")
      var img_height
      var img_width
      var img_tag = new Image()
      for(var i=0;i<id_url.length;i++) {
        if(img_id==id_url[i].id) {
          img_tag.src = id_url[i].img_url
          console.log(id_url[i].img_url)
          $(img_tag).load(function() {
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
          })
        }
      }
    }