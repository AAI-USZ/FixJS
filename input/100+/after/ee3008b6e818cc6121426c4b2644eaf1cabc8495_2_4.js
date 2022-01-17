function(cid)	 			  // Listing Discussions of a course with the given cid. 
 {
	 var main = this;
	 
	var o, m, i, j, k; 
	var n = new Array; 
	for (i = 0; i < main.data.allCourses.length; i++)
	{	
		o = main.data.allCourses[i];		
		if (o.courseID == cid){
				var ds = o.courseDiscussions;
				n=ds.split(",");
		}
	}
	
 	$('#courseDiscussionsBody').html(" ");
	
	for (j = 0; j < main.data.allDiscussions.length; j++)
	{
		m = main.data.allDiscussions[j]; 		
		for(k = 1;  k < n.length; k++)
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