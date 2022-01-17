function updatePost(posttag) {
		var postinfotag = $jq(posttag).children(".postInfo").children(".userInfo, .nameBlock")
				.add( $jq(posttag).children(".postInfoM").children(".userInfo, .nameBlock") );

		var id = $jq(".posteruid", postinfotag).first().text();

		if (id == "(ID: Heaven)")
			return;
		
		var postnumspan = $jq(posttag).children(".postInfo, .postInfoM").children(".postNum");
		var subjectspan = $jq(".subject", postinfotag).add( $jq(posttag).children(".postInfo").children(".subject") );

		var postnum = $jq("a[title='Quote this post']", postnumspan).first().text();
		var name = null;
		var tripcode = null;
		var email = null;
		var subject = null;
		
		var assignbutton = $jq(".assignbutton", postinfotag).add( $jq(posttag).children(".postInfo").children(".assignbutton") );

		if (optionsGetB("Enable Sync")) {
			var info = getOnlineInfo(postnum);
			if (info != null && info[0] != null && info[0] != "") {
				names[id] = info[0];
				email = info[1];
				subject = info[2];
			}
		}
		
		if (names[id] != null) {
			name = names[id];
			tripcode = "";
			
			name = name.split("#");
			
			if (typeof name[1] != "undefined")
				tripcode = " !" + name[1];

			name = name[0];
			
			if (subject != null && subject != "" && subjectspan.first().text() != subject)
				subjectspan.text(subject);

			var nametag = $jq(".name", postinfotag);
			var triptag = $jq(".postertrip", postinfotag);

			if (nametag.first().text() != name)
				nametag.text(name);

			if (email != null && email != "") {
				var emailtag = $jq(".useremail", postinfotag);
				if (emailtag.length == 0) {
					emailtag = $jq("<a/>")
					.addClass("useremail")
					.insertBefore(nametag);

					nametag.first().appendTo(emailtag);
					nametag.slice(1).remove();
					nametag = $jq(".name", postinfotag);

					triptag.remove();
					triptag = $jq(".postertrip", postinfotag);
				}
				emailtag.attr("href", "mailto:"+email);
			}

			if (tripcode != null || triptag.length != 0) {
				if (triptag.length == 0) {
					triptag = $jq("<span/>").addClass("postertrip");
					nametag.after(triptag);
					triptag = $jq(".postertrip", postinfotag);
				}
				if (triptag.first().text() != tripcode) {
					triptag.text(tripcode);
				}
			}
		}
	}