function(){
    var $this = $(this), deps, i;
    // check ones that this relies on
    if ( $this.is(':checked') ) {
      deps = Modulizr._dependencies[ $this.closest('li').attr('id').replace('_','-') ];
      for( i in deps ) {
        $( '#' + deps[ i ] ).find('input:checkbox').attr('checked', 'checked');
      }
    }
    // uncheck ones that rely on this
    else {
      _( Modulizr._dependencies ).each(function( depArr, name ) {
        if ( _(depArr).contains( $this.closest('li').attr('id').replace('_','-') ) ) {
          $( '#' + name ).find('input:checkbox').removeAttr('checked');
        }
      });
    }
    // Always hide the build
    $('#modulizrize').html('');
    $("#generatedSource").removeClass('sourceView').val( '' );
  }