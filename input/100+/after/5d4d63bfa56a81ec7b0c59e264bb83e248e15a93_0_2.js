function (a,d) {

      	var b = 6; 

      	var c = [6];

      	if (tt.user.fanOf.indexOf(a.userid)>=0) { b = 5; c.splice(0,0,5); }

      	if (a['verified']) { b = 0; c.splice(0,0,0); }

      	if (a.acl>1) { b = 1; c.splice(0,0,1); }

      	if (a.acl==1) { b = 2; c.splice(0,0,2); }

      	if (tt.room.moderators.indexOf(a.userid)>=0) { b = 3; c.splice(0,0,3); }

      	if (tt.room.djIds.indexOf(a.userid)>=0) { b = 4; c.splice(0,0,4); }

      	if (d) {

      	  c=c.map(function(a) { return userTypes[a]; })

      	}

      	return (d)?c:b;

      }