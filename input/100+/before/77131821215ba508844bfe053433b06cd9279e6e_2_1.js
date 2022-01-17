function() {

  /** Clients List **/
  
  var clients = [ 
  	{
  		"name" : "Field Lens",
  		"icon" : "images/client-icon-fieldlens.png",
  		"desc" : "Field Lens is a management tool for all facets of a construction project. Capture and communicate tasks and issues, with detailed workflow and media sharing.\n\nFieldLens is part of a small but growing set of companies building mobile first, and starting on Android. Very excited to be on the team.",
  		"url"  : "http://fieldlens.com/",
  		"bg"   : "images/clients-bg-fieldlens.jpg"
  	},
  	{
  		"name" : "Associated Press",
  		"icon" : "images/client-ap.png",
  		"desc" : "Taking over from the original vendor. Deep code review and optimization. Full design refresh coming soon.",
  		"url"  : "http://ap.org/",
  		"bg"   : "images/clients-bg-ap.jpg"
  	},
  	{
  		"name" : "Harvest",
  		"icon" : "images/client-harvest.png",
  		"desc" : "Harvest is an online time tracking, timesheet, and invoicing service.\n\nWe built an Android port of their iPhone application. The mobile version allows a subset of features available from their web application, centered around easy time entry.",
  		"url"  : "http://www.getharvest.com/",
  		"bg"   : "images/clients-bg-harvest.jpg"
  	},
  	{
  		"name" : "Squarespace",
  		"icon" : "images/client-squarespace.png",
  		"desc" : "Squarespace is a simple and powerful website and blog hosting service.\n\nWe developed the Android version of their iPhone application, from scratch through public beta earlier this year while they prepped internal people to take over the project. The final app was recently put into the market.",
  		"url"  : "http://squarespace.com/",
  		"bg"   : "images/clients-bg-squarespace.jpg"
  	}
  ];

  /** End Clients List **/

  $(".icon").click(function() {
    var i = $(this).index();
    var client = clients[i];
    if (i % 2 == 0) {
      $('div#right-blurb').hide();
      $('div#left-blurb').fadeIn('slow');
    }
    else {
      $('div#left-blurb').hide();
      $('div#right-blurb').fadeIn('slow');
    }
    $('img.blurb_img').attr("src", client.icon).attr("alt", client.name +" Logo");
    $('div.blurb a').attr("href", client.url).attr("title", client.name +" Homepage");
    $('div.blurb p').text(client.desc);
    $('#clients_imgs').css('background-image', 'url(' + client.bg + ')'); 
    
    $('#shadow').removeClass().addClass('grid_4 prefix_' + i*4);
  });


  $("div.product").hover(
  	function () {
  	  $(this).addClass("hover");
  	},
  	function () {
  	  $(this).removeClass("hover");
  });
  
  $("div.product").click(function(){
     window.location=$(this).find("a").attr("href");
     return false;
  });
  
  
    
  /** Team List **/
	
	
  var team = [ 
  	{
  		'name'     : 'Kevin Galligan',
  		'icon'     : 'images/pic-kevin-large.jpg',
  		'position' : 'Lead Developer/President',
  		'desc'     : 'Kevin has a BA in CS from Colgate University. He spent several years managing developers for a financial firm, then left a few years ago to pursue the startup lifestyle. Since then, he has built several products, in both the web and mobile space.',
  		'links'     : [
  			{
  				'name'  :  'OHours',
  				'url'	:  'http://ohours.org/kpgalligan',
  				'desc'  :  'Check out his office hours, Fridays at 2PM EST'
  			},
  			{
  				'name'	  :  '@kpgalligan',
  				'url' :  'https://twitter.com/#!/kpgalligan',
  				'desc'  :  'Follow him on twitter'
  			},
  			{
  				'name'	  :  'Stack Overflow',
  				'url' :  'http://stackoverflow.com/users/227313/kevin-galligan',
  				'desc'  :  '<img src="http://stackoverflow.com/users/flair/227313.png?theme=dark" width="208" height="58" alt="profile for Kevin Galligan at Stack Overflow" title="profile for Kevin Galligan at Stack Overflow" />'
  			}
  		]
  	},
  	{
  		'name'     : 'Brian Plummer',
  		'icon'     : 'images/pic-brian-large.jpg',
  		'position' : 'Android Software Specialist',
  		'desc'     : 'Brian attended Georgia Tech and snagged a degree in CS. He used to be a web developer, but but switched over because he likes Android\'s \"openness.\" Brian is our very own Southern gentleman who enjoys Vietnamese subs and saying, \"Cool.\" Brian used to own a car, but now he scooters home.',
  		'links'     : []
  	},
  	{
  		'name'     : 'William Sanville',
  		'icon'     : 'images/pic-will-large.jpg',
  		'position' : 'Developer Extraordinaire',
  		'desc'     : 'Will is a former web developer turned Android developer, with CS degrees from RPI and UConn. When not answering questions on Stack Overflow, Will works on open source projects Cflat and SharpScrabble. Will secretly loves functional programming, and thinks that every problem can be solved in terms of map and reduce. He almost always brings his lunch.',
  		'links'     : [
  			{
  				'name'  :  'Cflat',
  				'url'	:  'http://code.google.com/p/cflat/',
  				'desc'  :  ""
  			},
  			{
  				'name'	  :  'SharpScrabble',
  				'url' :  'http://code.google.com/p/sharpscrabble/',
  				'desc'    :  ""
  			},
  			{
  				'name'	  :  'Stack Overflow',
  				'url' :  'http://stackoverflow.com/users/248994/wsanville',
  				'desc'    :  '<img src="http://stackoverflow.com/users/flair/248994.png?theme=dark" width="208" height="58" alt="profile for wsanville at Stack Overflow" title="profile for wsanville at Stack Overflow" />'
  			}
  		]
  	},
  	{
  		'name'     : 'Matthew Davis',
  		'icon'     : 'images/pic-matt-large.jpg',
  		'position' : 'Developer',
  		'desc'     : 'Matt is a recent graduate of Georgetown University, where he studied Computer Science and Government.  He was originally attracted to Android because of a deep love of Star Wars and decided to stick with it despite the fact that it does not, in actuality, involve making human-like robots.  In his spare time he enjoys playing board games and reading science fiction novels.',
  		'links'     : []
  	},
  	{
  		'name'     : 'Izzy Oji',
  		'icon'     : 'images/pic-izzy-large.jpg',
  		'position' : 'Devastatingly Attractive Intern *',
  		'desc'     : 'Izzy is currently a junior at Stony Brook University majoring in computer science. She enjoys taking pictures and Knicks games. She has dreams of taking Kevin\'s job. * Izzy wrote this. Kevin would not write this because it would break all sorts of HR rules.',
  		'links'     : []
  	},
  	{
  		'name'     : 'Paul Burke',
  		'icon'     : 'images/pic-paul-large.jpg',
  		'position' : 'Product Designer',
  		'desc'     : 'Paul is a self-taught designer and developer. He has been focused on Android since version 1.1, published many successful apps, won a couple of awards, and done a bunch of consulting. He\'s passionate about UX/UI design, and is a Photoshop wiz.',
  		'links'    : [
  			{
  				'name'  :  '+Paul Burke',
  				'url'	:  'https://plus.google.com/113406723988623654387',
  				'desc'  :  'Follow him on Google+'
  			},
  			{
  				'name'	:  'iPaulPro',
  				'url'   :  'https://dribbble.com/iPaulPro',
  				'desc'  :  'Check him out on Dribbble'
  			},
  			{
  				'name'	:  'Stack Overflow',
  				'url'   :  'http://stackoverflow.com/users/377260/ipaulpro',
  				'desc'  :  '<img src="http://stackoverflow.com/users/flair/377260.png?theme=dark" width="208" height="58" alt="profile for iPaulPro at Stack Overflow" title="profile for iPaulPro at Stack Overflow" />'
  			}
  		]
  	}
  ];

  /** End Team List **/

 $(".pic").click(function() {

    $('div#pic-team img').remove();
 	$('.pic img').removeClass('selected');
  	$(this).find('img').addClass('selected');

    var i = $(this).index()
      , member = team[i]
      , links = member.links
      , view = ""
      , stack;
    for(var x = 0; x < links.length; x++) {
       var link = links[x];
	   if(link.name != 'Stack Overflow') {
	   	 view += '<p class="link">'+ link.desc +' - <a href="'+ link.url +'">'+ link.name +'</a></p>';
	   } else {
	     view += '<div class="stack"><a href="'+ link.url +'">'+ link.desc +'</div>';
	   }
	}
	
    $('div#pic-team').empty().append(
    	'<img src="'+ member.icon +'" class="grid_5" />'
    	+ '<p class="grid_6 member_name medium">'+ member.name +' <span class="light">- '+ member.position +'</span></p>'
    	+ '<p class="grid_6 member_desc">'+ member.desc +'</p>'
    	+ '<div class="grid_6 links">'+ view +'</div>'
  	);
  });
  
  
    /** Preload **/

  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
  }
  
  preload([
      'images/clients-bg-ap.jpg',
      'images/clients-bg-fieldlens.jpg',
      'images/clients-bg-squarespace.jpg',
      'images/clients-bg-harvest.jpg',
      'images/clients-bg-squarespace.jpg',
      'images/pic-brian-large.jpg',
      'images/pic-izzy-large.jpg',
      'images/pic-kevin-large.jpg',
      'images/pic-matt-large.jpg',
      'images/pic-paul-large.jpg',      
      'images/pic-will-large.jpg'    
  ]);
  
  // Load dialog on click
  $('#contact_us').click(function (e) {
      $('#contact_modal').modal();
  
      return false;
  });
  
}