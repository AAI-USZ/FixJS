function($, tpl){

	window.store = window.localStorage;

	var container = $('.js-comments'),
		clientID = '4e3a2ccec7c91a9eb26c',
		issueID = document.body.getAttribute('data-issueID'),
		path = 'https://api.github.com/repos/sirbrad/sirbrad.github.com/issues/' + issueID + '/comments',
		listing,
		textarea;
		
	// Create the element that will hold the comments
	listing = document.createElement('ol');
	listing.className = 'comment__listing';
	
	function formatDate(str) {
	
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			newDate = new Date(str),
			currentDay = newDate.getDate(),
			currentMonth = newDate.getMonth(),
			currentYear = newDate.getFullYear();
			
		return currentDay + ' ' + months[currentMonth] + ' ' + currentYear;
		
	}
	
	function err(elem) {
	
		// Function was being called everytime request?
	
				
		elem.html('<p class="h1">This is embarrassing!</p><p>Try reload the page, if that magical trick doesn\'t resolve the problem then hit me up on <a href="https://twitter.com/Bradleyfew">twitter</a>!<p>')
			.css('display', 'block');
		
	}
	
	function renderMarkdown(comment) {
	
		var input = {
			'text': comment.body,
			'mode': 'gfm'
		}
	
		$.ajax({
			url: 'https://api.github.com/markdown',
			type: 'POST',
			data: JSON.stringify(input),
			success: function(data, status, jqXHR) {
				
				comment.body_html = data;
				
				var arr = []
				
				arr.push(comment);
				
				appendData(arr, true);
				
			}
		});

	}
	
	
	function appendData(data, isNew) {
	
		// Remove class if found to stop double animation
		container.find('li').removeClass('is-new');
	
		// needs tweaking to only animate newly added
		var clsname = (isNew) ? 'is-new' : '';

		// Loop through the data and create elements using template
		$.each(data, function(i){
			
			comment = tpl({
				useravatar: data[i].user.avatar_url,
				username: data[i].user.login,
				url: data[i].user.url.split('users/')[1],
				content: data[i].body_html,
				date: formatDate(data[i].created_at),
				commenturl: data[i].url,
				classname: clsname
			});
			
			// Add rendered template to 
			listing.innerHTML += comment;
	
		});
	
		container
			.append(listing)
			.addClass('has-comments');

	}
	
	// Grab our comments
	(function grabData() {
	
		$.ajax({
			url: path,
			headers: {Accept: "application/vnd.github.full+json"},
			dataType: 'json',
			success: function(data) {
				
				if (data.length) {
					appendData(data);
				}
			}
		});
		
	}());
	
	


	// Adding comments	
	function postComment() {
		
		var comment = {
				'body': textarea[0].value
			};
	
		$.ajax({
			url: 'https://api.github.com/repos/sirbrad/sirbrad.github.com/issues/' + issueID + '/comments',
			type: 'POST',
			data: JSON.stringify(comment),
			dataType: 'json',
			headers:  {
				 Authorization: 'token '+ window.store.getItem('token'), 
				 Accept: 'application/vnd.github.raw'
				//'Content-Type': 'application/json; charset=UTF-8'
			},
			success: function(data, status, jqXHR){
				
				// We have to render to markdown before inserting
				renderMarkdown(data);
				
				// Reset the textarea value
				textarea[0].value = '';
				
			}
		});
		
	}
	
	function authenticateUser() {
			
		$.ajax({
			url: 'https://api.github.com/user?access_token=' + window.store.getItem('token'),
			type: 'GET',
			success: function(data, status, jqXHR){

				postComment();
			}
		})
	
	}
	
	function authenticateApp() {
	
		
		// Check if user has a token stored		
		if (!window.store.getItem('token')) {
		
			var popup = open('https://github.com/login/oauth/authorize?client_id=' + clientID + '&scope=public_repo,user&redirect_uri=' + location.origin + '/login.html', 'popup', 'width=920,height=500');

		} else {
		
			authenticateUser();
		}
			
	
	}
	
	
	// Validation
	function validate(elem) {
		
		textarea = $(elem).find('textarea');
		
		if (textarea.val() === '') {
			
			elem.addClass('comment--error');
			
			textarea.on('keyup', function(){
			
				if (textarea.val() !== '') {
					elem.removeClass('comment--error');
				} 
				
			})
			
		} else {
		
			authenticateApp();
		}
	
	}
	
	
	// Comment Events
	
	$('.js-post-comment').on('click', 'input', function(e){
	
		// Validate this shit!
		validate($(this).parent());
		
		e.preventDefault();
	})
	
	
	window.addEventListener('message', function (e) {
		
		$.ajax({
			url: 'http://alanfewcompany.co.uk/oauth.php?code=' + e.data.split('&')[0],
			type: 'GET',
			success: function(token) {
				
				window.store.setItem('token', token);
				
				authenticateUser();
					
			}
		})
	})
	


}