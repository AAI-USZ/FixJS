function(list, category, type) {
	
	var markup = "<li><a href='http://s3.amazonaws.com/ShannonRoman/" + category + "/full/" + type + "/${$item.getAlbum()}${Full}'><img src='http://s3.amazonaws.com/ShannonRoman/" + category + "/thumb/" + type + "/${$item.getAlbum()}${Thumb}' class='image0' /></a></li>";
	
	// Compile the markup as a named template
	$.template( "imageTemplate", markup);
	
	// Render the template with the movies data and insert
	// the rendered HTML under the "movieList" element
	$.tmpl( "imageTemplate", list, {
		getAlbum: function() {
			if (this.data.Album == "")
				return "";
			return this.data.Album + "/";
		}
	} ).appendTo( ".ad-thumb-list" );
}