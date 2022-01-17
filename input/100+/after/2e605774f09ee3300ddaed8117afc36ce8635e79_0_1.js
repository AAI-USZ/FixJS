function asfinish(xml2, xsl, object, e) {

	var asString = (new XMLSerializer()).serializeToString(xml2);

	clipid = edited.slice(1,-2);

	console.log('AJAX SAVE');

	// console.log(asString);

	// console.log(xml2);

	// console.log(author);

	console.log(cat);

	console.log(clipid);

	// console.log(stop);

	// console.log(mmm);

	console.log("***");

	

	var continueSaveHandler = false;

	

	// <div id="text"><p c="105" class="comment" title="106">START-MV: pas (encore) de macro, à completer par le rédacteur.</p><p c="105" title="106"> tikken op de plaats van de drie puntjes</p></div>



	// $(xml2).find("")

	

	//console.log("doc " + asString + "\ncat: " + cat + "\nstart: " + clipid + "\nstop: " + stop  + "\nmeeting: " + mmm  + "\nid: " + author);

		$.ajax({

			url: "/exist/tullio/xq/storeClipEdit.xql",

			type: "POST",

			contentType: "application/x-www-form-urlencoded;charset=UTF-8",

			data: {

				"doc": asString,

				"cat": cat,

				"start": clipid,

				"stop": stop,

				"meeting": mmm,

				"id": author

			},

			async: false,

			success: function(response) {continueSaveHandler = true; alert('text saved'); console.log(response);}

	});

		

		

		/*

		if (continueSaveHandler) {

		

		$.ajax({

							url: "/exist/tullio/xq/unlock.xql",

							type: "POST",

							data: {

								"v": cat,

								"n": clipid,

								"id": author,

								"m": mmm

							},

							async: false

					});

	console.log('after requests');

	$(jq(rowId) + " table.events-table").replaceWith($("#hidden table.events-table"));

	// $('div.second').replaceWith('<h2>New heading</h2>');

	$(jq(rowId) + " table.events-table").addClass('edited');

	

	$(jq(rowId) + " events").replaceWith($("#hidden events"));

	

	var newContent = $("#hidden div#text").html();

	editor.setData(newContent);

					

	$("#cke").attr('id', '');



	setTimeout( function() {$(jq(edited)).addClass("content"); edited=''; editor.destroy(); }, 200);					

	noUpdate = false;

		

		}

		

		else {alert('Save action failed, the server could not be reached. Please try again.');}

	

		*/

		noUpdate = false;

		console.log('exit finish');

}