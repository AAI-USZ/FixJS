function(to, from) {
        $(this.el)
          .find(from).addClass('hide')
        .end()  
          .find(to).removeClass('hide');  
      }