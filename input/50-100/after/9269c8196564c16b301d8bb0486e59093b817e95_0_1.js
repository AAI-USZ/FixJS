function( depArr, name ) {
        if ( _(depArr).contains( $this.closest('li').attr('id').replace('_','-') ) || _(depArr).contains( $this.closest('li').attr('id') ) ) {
          $( '#' + name ).find('input:checkbox').removeAttr('checked');
        }
      }