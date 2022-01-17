function () {
    if ( !vml.text_shim ) {
      vml.text_shim = document.getElementById('pv_vml_text_shim') || document.createElement('span');
      vml.text_shim.id = 'protovisvml_text_shim';
      vml.text_shim.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline-block;white-space:nowrap;";
      document.body.appendChild( vml.text_shim );
    }
    if ( !vml.styles ) {
      vml.styles = document.getElementById('protovisvml_styles') || document.createElement("style");
      if ( vml.styles.id !== 'protovisvml_styles' ) {
        vml.styles.id = 'protovisvml_styles';
        document.documentElement.firstChild.appendChild( vml.styles );
        vml.styles.styleSheet.addRule( '.msvml', 'behavior:url(#default#VML);' );
        vml.styles.styleSheet.addRule( '.msvml_block', 'position:absolute;top:0;left:0;' );
      }
      try {
        if ( !document.namespaces.v ) { document.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' ); }
      }
      catch (e) {
        vml.pre  = '<';
        vml.post = ' class="msvml" xmlns="urn:schemas-microsoft.com:vml">';
      }
    }
  }