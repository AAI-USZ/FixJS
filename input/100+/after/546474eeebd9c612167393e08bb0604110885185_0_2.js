function NameSync() {
	var optionPre = "NameSync.";
	var optionsNames = ["Enable Sync", "Hide IDs", "Cross-thread Links", "Append Errors", "Automatic Updates", "Override Fields"];
	var optionsDescriptions = ["Share names online", "Hide IDs next to names", "Add >>>/b/ to cross-thread links on paste", "Show sync errors inside the quick reply box", "Notify about updates automatically", "Share these instead of the quick reply fields"];
	var optionsDefaults = ["true", "false", "false", "true", "true", "false"];
		
	var $jq = jQuery.noConflict();
	var ver = "2.2.64";
	
	var uv = ver.replace(/\./g, "");
	var ut = Date.now();
	var ulv = optionsGet("latestversion");
	var ulc = optionsGet("lastcheck");
	if (ulv == "") lv = uv;
	if (ulc == "") lc = ut;	
	
	var names = null;

	var onlineNames = [];
	var onlinePosts = [];
	var onlineEmails = [];
	var onlineSubjects = [];

	var onlineIDs = {};
	
	var t = document.URL;
	t = t.replace(/^.*\/|\.[^.]*$/g, '');
	t = t.substring(0, 9);
	if (t.length < 9) t = "b";
	
	var status = 0;
	
	$jq('form[name="delform"]').prepend("<span id='syncStatus' style='color: gray;'>Waiting</span><br /><a id='optionsPopUp' href='javascript:;'' style='text-decoration: none;' title='Open options'>Options</a><br /><br />");
	$jq("#optionsPopUp").click(function() { optionsShow(); });
	
	var dstyle = document.createElement('style');
	document.body.appendChild(dstyle);
	var sstyle = document.createElement('style');
	sstyle.textContent = "#optionsScreen ul li { margin-bottom: 2px; } #optionsScreen a#closeBtn { float: right; } #optionsScreen input[type='text'] { border: 1px solid #ccc; padding: 2px; width: 30%; margin-right: 2px; } #optionsScreen a { text-decoration: none; } #optionsOverlay { background-color: black; opacity: 0.5; z-index: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; } #optionsScreen h1 { font-size: 1.2em; text-align: left; } #optionsScreen h2 { font-size: 10pt; margin-top: 12px; margin-bottom: 12px; } #optionsScreen * { margin: 0; padding: 0; } #optionsScreen ul { list-style-type: none; } #optionsScreen { color: black; width: 400px; height: 400px; display: none; z-index: 1; background: url(http://nassign.heliohost.org/s/best_small.png?i="+Date.now()+") no-repeat #f0e0d6; background-color: #f0e0d6; background-position: bottom right; padding: 12px; border: 1px solid rgba(0, 0, 0, 0.25); position: absolute; top: 50%; left: 50%; margin-top:-200px; margin-left:-200px; }";
	document.body.appendChild(sstyle);
	
	function update() {
		var ul = $jq("#updateLink");
		ul.html("Checking...");
		$jq.ajax({
			headers: {"X-Requested-With":"Ajax"},
			url: 'http://nassign.heliohost.org/s/uq.php'
		}).done(function(lv) {
			optionsSet("latestversion", lv);
			optionsSet("lastcheck", ut);
			if (lv > uv) {
				ul.html("Update available");
				if (confirm("A new update for /b/ Name Sync is available, install now?"))
					window.location = "https://github.com/milkytiptoe/Name-Sync/raw/master/NameSync.user.js";
			} else
				ul.html("No update available");
		}).fail(function() {
			ul.html("Error checking for update");
		});
	}
	
	if (optionsGetB("Automatic Updates")) {
		if (ut > ulc+86400000 && ulv <= uv) {
			update();
		}
		if (ulv > uv) {
			$jq("#syncStatus").before("A new update for /b/ Name Sync is available. \
			<a href='javascript:;' onclick='window.location = \"https://github.com/milkytiptoe/Name-Sync/raw/master/NameSync.user.js\";' https://github.com/milkytiptoe/Name-Sync/raw/master/NameSync.user.js' target='_blank' onclick='javascript: this.innerHTML =\"\"'>Install now</a><br />After installing update, <a href='javascript:;' onclick='javascript:location.reload(true);'>refresh</a> to apply changes<br /><br />");
		}
	}
	
	function optionsShow() {
		$jq("body").css("overflow", "hidden");
		$jq(window).scrollTop(0);
		var overlayDiv = document.createElement("div");
		overlayDiv.setAttribute("id", "optionsOverlay");
		document.body.appendChild(overlayDiv);

		var optionsDiv = document.createElement("div");
		optionsDiv.setAttribute("id", "optionsScreen");
		optionsDiv.innerHTML = "<h1>/b/ Name Sync<a href='javascript:;'' id='closeBtn' title='Close options'>X</a></h1>"+ver+"<h2>Options</h2>";
		
		var optionsList = document.createElement("ul");
		
		for (var i = 0, len = optionsNames.length; i < len; i++) {
			var checked = optionsGetB(optionsNames[i]) ? 'checked' : '';
			optionsList.innerHTML += "<li><label><input type='checkbox' name='"+optionsNames[i]+"' "+checked+" /> <strong>"+optionsNames[i]+"</strong> "+optionsDescriptions[i]+"</label></li>";
		}
		
		optionsList.innerHTML += "<li><input type='text' id='bName' placeholder='Name' value='"+optionsGet("Name")+"' /> <input type='text' id='bEmail' placeholder='Email' value='"+optionsGet("Email")+"' /> <input type='text' id='bSubject' placeholder='Subject' value='"+optionsGet("Subject")+"' />";
		optionsDiv.appendChild(optionsList);
		
		optionsDiv.innerHTML += "<h2>More</h2><ul><li><a href='http://mayhemydg.github.com/4chan-x/' target='_blank'>4chan X</a></li><li><a href='https://raw.github.com/milkytiptoe/Name-Sync/master/changelog' target='_blank'>Changelog</a></li><li><a href='http://milkytiptoe.github.com/Name-Sync/' target='_blank'>Website</a></li><li><a href='http://desktopthread.com/tripcode.php' target='_blank'>Test tripcode</a></li><li id='updateLink'><a href='javascript:;''>Check for update</a></li></ul><br />";
		
		$jq('input[type="checkbox"]').live("click", function() { optionsSet($jq(this).attr("name"), String($jq(this).is(":checked"))); });
		
		$jq("#closeBtn").live("click", function() { optionsHide(); });
		overlayDiv.onclick = function() { optionsHide(); };
		document.body.appendChild(optionsDiv);
		
		$jq("#bName").change(function() { optionsSet("Name", $jq(this).val()); });
		$jq("#bEmail").change(function() { optionsSet("Email", $jq(this).val()); });
		$jq("#bSubject").change(function() { optionsSet("Subject", $jq(this).val()); });
		$jq("#updateLink").click(function() { update(); $jq(this).unbind("click"); });
		
		$jq("#optionsScreen").fadeIn("fast");
	}
	
	function optionsHide() {
		$jq("#optionsScreen").remove();
		$jq("#optionsOverlay").remove();
		$jq("body").css("overflow", "visible");
	}
	
	function styles() {
		dstyle.textContent = ".posteruid { display: " + (optionsGetB("Hide IDs") ? "none" : "inline") + "; }";
	}
	
	function init() {
		if (!optionsGetB("Has Run")) {
			optionsShow();
			optionsSet("Has Run", "true");
		}
		
		if ($jq("#qr").length) QRListen();
			
		if (t != "b") sync();
		
		loadNames();
		styles();
		updateElements();
		assignMenu();
	}
	
	function assignMenu() {
		var d = document;
		var a = d.createElement('a');
		a.href = 'javascript:;';
		a.textContent = "Assign name";

		var open = function(post) {
			var uid = $jq(".posteruid", post.el).first().text();
			return uid != "(ID: Heaven)" && !onlineIDs[uid];
		};
		
		a.addEventListener('click', function() {
			assignName(d.getElementById(d.getElementById('menu').dataset.rootid).querySelector(".posteruid").textContent);
		});

		d.dispatchEvent(new CustomEvent('AddMenuEntry', {
			detail: {
				el: a,
				open: open
			}
		}));
	}
	
	function send(e) {
		if (!optionsGetB("Enable Sync")) return;
		
		var qr = $jq("#qr");
		var postID = e.originalEvent.detail.postID;
		var threadID = e.originalEvent.detail.threadID;
		var cName;
		var cEmail;
		var cSubject;

		if (optionsGetB("Override Fields")) {
			cName = optionsGet("Name");
			cEmail = optionsGet("Email");
			cSubject = optionsGet("Subject");
		} else {
			cName = $jq('input[name="name"]', qr).val();
			cEmail = $jq('input[name="email"]', qr).val();
			cSubject = $jq('input[name="sub"]', qr).val();
		}
			
		if ($jq.trim(cName) == "" || cEmail == "sage") return;

		uploadName(cName, cEmail, cSubject, postID, threadID);
	}

	function uploadName(cName, cEmail, cSubject, postID, threadID, isLateOpSend) {
		var d = "p="+postID+"&n="+encodeURIComponent(cName)+"&t="+threadID+"&s="+encodeURIComponent(cSubject)+"&e="+encodeURIComponent(cEmail);

		if (isLateOpSend && !sessionStorage["namesync-tosend"])
			return;

		if (t == "b") {
			isLateOpSend = true;
			sessionStorage["namesync-tosend"] = JSON.stringify({
				name: cName,
				email: cEmail,
				subject: cSubject,
				postID: postID,
				threadID: threadID,
			});
		}

		$jq.ajax({
			headers: {"X-Requested-With":"Ajax"},
			type: "POST",
			url: "http://nassign.heliohost.org/s/sp.php",
			data: d
		}).fail(function() {
			setSyncStatus(3, "Offline (Error sending, retrying)");
			setTimeout(uploadName, 15*1000, cName, cEmail, cSubject, postID, threadID, isLateOpSend);
		}).success(function() {
			if (isLateOpSend)
				delete sessionStorage["namesync-tosend"];
		});
	}
	
	function QRListen() {
		$jq("#qr")
			.off("QRPostSuccessful.namesync", send)
			.on("QRPostSuccessful.namesync", send);
			
		if (optionsGetB("Cross-thread Links")) {
			var commentBox = $jq('#qr textarea[name="com"]');
			commentBox.off("paste.namesyc").on("paste.namesync", function() {
				setTimeout(function() {
					commentBox.val(commentBox.val().replace(/>>(\d\d\d\d\d\d\d\d\d)/g, ">>>/b/$1"));
					$jq(".thread .post", document).each(function() {
						var id = this.id.substring(1);
						commentBox.val(commentBox.val().replace(new RegExp(">>>/b/"+id, "g"), ">>"+id));
					});
					commentBox[0].dispatchEvent(new Event("input"));
				}, 100);
			});
		}
	}
	
	function canSync() {
		var ic = $jq("#imagecount");
		if (ic.length && ic.hasClass("warning")) return false;
		var c = $jq("#count");
		if (c.length && c.text() == "404") return false;
		return true;
	}
	
	function setSyncStatus(type, msg) {
		if (t == "b") return;
		
		var colour = "green";
		
		switch (type) {
			case 1: colour = "red"; break;
			case 2: colour = "gray"; break;
			case 3: colour = "#CD7300"; break;
		}
		
		$jq("#syncStatus").html(msg).css("color", colour);
		
		if (status != type && optionsGetB("Append Errors"))	{
			$jq("div.warning").html("<span style='color: "+colour+" !important;'>Sync is "+msg+"</span>");
			setTimeout(function() { $jq("div.warning").html(""); }, 5000);
		}
		
		status = type;
	}
	
	function sync() {
		if (optionsGetB("Enable Sync"))	{
			$jq.ajax({
				headers: {"X-Requested-With":"Ajax"},
				dataType: "json",
				url: 'http://nassign.heliohost.org/s/qp.php?t='+t,
				cache: false
			}).fail(function() {
				setSyncStatus(1, "Offline (Error retrieving)");
			}).done(function(data) {
				if (data == null) {
					setSyncStatus(0, "Online");
				} else {
					onlineNames = [];
					onlinePosts = [];
					onlineSubjects = [];
					onlineEmails = [];
					
					for (var i = 0, len = data.length; i < len; i++) {
						onlineNames.push(data[i].n);
						onlinePosts.push(data[i].p);
						onlineEmails.push(data[i].e);
						onlineSubjects.push(data[i].s);
					}

					setSyncStatus(0, "Online");
					updateElements();
				}
			});
		} else {
			setSyncStatus(2, "Disabled");
		}
		
		if (canSync()) {
			setTimeout(function() { sync(); }, 30000);
		}
	}
	
	function updateElements() {
		$jq(".thread .post", document).each(function() {
			updatePost(this);
		});
		
		storeNames();
	}

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
				onlineIDs[id] = true;
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
	
	function getOnlineInfo(postnum) {
		var index = onlinePosts.indexOf(postnum);
		return index > -1 ? [onlineNames[index], onlineEmails[index], onlineSubjects[index]] : null;
	}
	
	function assignName(id) {
		var name = prompt("What would you like this poster to be named?","");
		
		if (name != null && name != "")	{
			names[id] = name;
			updateElements();
		}
	}
	
	function optionsSet(name, value) {
		localStorage.setItem(optionPre + name, value);
		
		if (name == "Hide IDs") styles();
	}
	
	function optionsGetB(name) {
		return optionsGet(name) == "true";
	}
	
	function optionsGet(name) {
		var value = localStorage.getItem(optionPre + name);

		if (value == null || typeof value == "undefined")
			return typeof optionsDefaults[optionsNames.indexOf(name)] != "undefined" ? optionsDefaults[optionsNames.indexOf(name)] : "";

		return value;
	}
	
	function storeNames() {
		sessionStorage["names"] = JSON.stringify(names);
	}

	function loadNames() {
		if (sessionStorage["names"] != null)
			names = JSON.parse(sessionStorage["names"]);

		if (names == null)
			names = {};
	}
	
	document.body.addEventListener('DOMNodeInserted', function(e) {
		if (e.target.nodeName=='DIV') {
			if ($jq(e.target).hasClass("replyContainer") && !$jq(e.target).hasClass("inline"))
				updatePost($jq(".reply", e.target));
				
			if (e.target.id == "qr")
				QRListen();
		}
	}, true);

	if (sessionStorage["namesync-tosend"]) {
		var r = JSON.parse(sessionStorage["namesync-tosend"]);
		uploadName(r.name, r.email, r.subject, r.postID, r.threadID, true);
	}
	
	init();
}