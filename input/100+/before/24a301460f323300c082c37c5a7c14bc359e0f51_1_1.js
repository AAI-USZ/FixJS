function Dscourse () 
{


	this.data 		   = new Array(); 
	this.data.allUsers	= new Array();
	this.data.allCourses = new Array();
	this.data.allDiscussions = new Array();
	this.data.allPosts = new Array();
	
	
// Courses 

	this.course = { }; 
	this.courseDataStatus = 'empty';


// Discussions

	this.discussion = { }; 	
 
	this.courseList = [];
	this.courseListName = {};
	
	this.discussionDataStatus = 'empty';
	
// Posts
	this.post = { };

// Get all Data

	this.GetData();

}