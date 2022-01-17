function() {
           var pos = $(this).scrollTop();
           var d = self.model.data();
           if( pos + $(window).height() > $(document).height() + 3) {
             d.setPage(d.getPage() + 1);
           } else if (pos < 0) {
             d.setPage(d.getPage() - 1);
           }
         }