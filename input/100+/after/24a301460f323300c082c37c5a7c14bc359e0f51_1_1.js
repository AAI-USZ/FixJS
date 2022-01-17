function Dscourse () 
{


	this.data 		   = new Array(); 
	this.data.allUsers	= new Array();
	this.data.allCourses = new Array();
	this.data.allDiscussions = new Array();
	this.data.allPosts = new Array();

// Users 

	this.nameList = new Array ();
	this.nameListName = new Object;	
	
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

// Fix for multiple image uploads 
	this.imgUpload = '';
	
// Get all Data

	this.GetData();

}