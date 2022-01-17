function(source, left, right) {

    extend(this,
        {left_delimiter: 	left +'%',
         right_delimiter: 	'%'+right,
         double_left: 		left+'%%',
         double_right:  	'%%'+right,
         left_equal: 		left+'%=',
         // set - Persona addition. The backend understands <%-, which acts
         // identical to the frontend's <%=.  <%= on the backend escapes
         // characters to their HTML code equivalents.  For unit testing, we
         // write backend templates on the front end, so we have to be able to
         // process <%-.  Creating an alias here.  Using it wherever
         // left_equal is found.
         left_dash: 		left+'%-',
         left_comment: 	left+'%#'})

	this.SplitRegexp = left=='[' ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp('('+this.double_left+')|(%%'+this.double_right+')|('+this.left_equal+')|('+this.left_dash+')|('+this.left_comment+')|('+this.left_delimiter+')|('+this.right_delimiter+'\n)|('+this.right_delimiter+')|(\n)') ;

	this.source = source;
	this.stag = null;
	this.lines = 0;
}