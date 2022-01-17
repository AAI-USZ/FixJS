function handleTunesSearchResults(arg) {

				var results = arg.results;

				var html = '';

				for (var i = 0; i < results.length; i++) {

					var item = results[i];

					var obj = {

						source: 0,

						track_id: item.trackId,

						track_name: item.trackCensoredName,

						track_url: item.trackViewUrl,

						artist_name: item.artistName,

						artist_url: item.artistViewUrl,

						collection_name: item.collectionCensoredName,

						collection_url: item.collectionViewUrl,

						genre: item.primaryGenreName,
						
						artwork: item.artworkUrl100

					};
					

					results[i] = obj;
					
					


	html += '<img src="{0}"  width="100" height="100"/>&nbsp;&nbsp;'.replace("{0}", item.artworkUrl100);
					
alert(item.artworkUrl100);
			
				

				

				jQuery('#itunes-results').html(html);

			
Parse.initialize("9TFpKOfV3hSAaBKazfX4tsLzmB2CMpBqiPPKeQq6", "tSXUDZVzAGipTmfxX5PdtXT2kb3cBxp7m8jjwUa4");
alert("sdf");
	 var currentUser = Parse.User.current();
var Request = Parse.Object.extend("Request");
var request = new Request();
request.set("track1", $("#entry_1").val());
request.set("track2", $("#entry_2").val());
request.set("track3", $("#entry_3").val());
request.set("track4", $("#entry_4").val());
request.set("track5", $("#entry_5").val());
request.set("title1", $("#title1").val());
request.set("description", $("#description").val());
request.set("genre", $("#genre").val());
request.set("tag1", $("#tag1").val());
request.set("tag2", $("#tag2").val());
request.set("tag3", $("#tag3").val());

request.set("cover", item.artworkUrl100);
request.set("by", "user");
request.save(null, {
 
  success: function(object) {
    alert("sdfsd");
	window.location = "http://sharp-ocean-1212.herokuapp.com/";
  }
  
  
});
}}