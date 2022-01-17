function( depArr, name ) {
        if ( _(depArr).contains( $this.closest('li').attr('id').replace('_','-') ) ) {
          $( '#' + name ).find('input:checkbox').removeAttr('checked');
        }
      }