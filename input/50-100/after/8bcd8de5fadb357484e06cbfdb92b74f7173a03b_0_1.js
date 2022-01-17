function( val )
	{
    // if 3d viewer window visible, change its z slice
    if( $( "#view_in_3d_webgl_widget").length ) {
        if( $('#enable_z_plane').attr('checked') != undefined ) {
            WebGLApp.updateZPlane( val );
        }
    }
		self.stack.moveToPixel( val, self.stack.y, self.stack.x, self.stack.s );
		return;
	}