function(value, index){
	        // TODO - do not add members that are not "current"
	        if (typeof value == "undefined") {
	            // console.log("** member index " + index + " is undefined.");
	            return;
	        }

			// Filter non active members
			if (value.roles.indexOf('לשעבר') != -1){
				// console.log("** excluding " + value.name);
				return;
			}

			if (value.roles === "יו\"ר ועדת הפירושים") {
				value.roles = "יושב ראש הכנסת";
			}

//			// filter out bills with stage 2 or less
//			for (var i = 0; i < value.bills.length; i++) {
//				if (parseInt(value.bills[i].stage) < 2) {
//					value.bills.splice(i,1);
//					i--;
//				}
//
//			}
			var new_committees = [];
			for (var i = 0; i < value.committees.length; i++) {
					obj = new Object();
					obj.title=value.committees[i][0];
					new_committees.push(obj)
			}
			value.committees = new_committees;
	        memberIdArray.push(value);
	        memberMap[value.id] = value;

	        partyMap[value.party].members.push(value);

	        var slimMember = {
	            name: value.name
	        };
	        slimDataMap[value.party].members.push(slimMember);

	       // stringImageListForDownload += "-O\nurl = \"" + value.img_url +
			// "\"\n";
	    }