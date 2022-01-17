function(cid)	 			  // Listing Discussions of a course with the given cid. 
 {
	 var main = this;

	 //main.allCourses[0]; 
	 
	var o, m, i, j, k;  
	for (var i = 0; i < main.data.allCourses.length; i++)
	{	
		o = main.data.allCourses[i];		
		if (o.courseID == cid){
				var n = new Array();
				var ds = o.courseDiscussions;
				n=ds.split(",");
		}
	}
	
 	$('#courseDiscussionsBody').html(" ");
	
	for (j = o; j < main.data.allDiscussions.length; j++)
	{
		m = main.data.allDiscussions[j]; 		
		for(var k = 1;  k < n.length; k++)
		{ 
			
			if (m.dID == n[k]) {
			$('#courseDiscussionsBody').append(
			    	  		  "<tr>"
			    	  		+ "<td> " + m.dTitle			+ "</td>" 
				            + "<td>  45 </td>" 
				            + "<td> <em>'It seems slightly better done than the...' by Mable Kinzie </td>" 
				            + "</tr>" 
			    	  	);
			 }
		}	
		
	}	
	
 }