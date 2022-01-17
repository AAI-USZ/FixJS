function() {
	var socket = io.connect('http://localhost');
	var form = $('form.post'),
		message = form.find('textarea'),
		name = form.find('input.username'),
		stream = $('.stream ul'),
		listUI = $('.app-list'),
		roomUI = $('.app-room'),
		roomList = listUI.find('ul'),
		roomName = $('h1 span'),
		loginContainer = $('.login-container'),
		loginForm = $('form.login'),
		loginButton = $('.login-button'),
		loginError = loginForm.find('div.alert'),
		adminButton = $('.admin-button'),
		adminUI = $('.app-admin');
		adminRooms = $('.app-admin.rooms'),
		adminRoomsList = adminRooms.find('.nav');
	
	var currentRoom;
	var user = {
		username: null,
		password: null
	};

	//used when switching screens, clears/hides pretty much everything
	function hideAll() {
		stream.html('');
		roomList.html('');
		roomName.html('');
		adminRoomsList.html('');

		roomUI.hide();
		listUI.hide();
		adminUI.hide();
	}

	//returns to the room list, clears the stream
	function showList() {
		socket.emit('leave',{room: currentRoom});
		currentRoom = null;
		hideAll();
		getRooms();
		listUI.show();
	}


	//gets a list of rooms and renders them to the listUI
	function getRooms(roomEl, prefix) {
		prefix = prefix || '#room/';
		roomEl = roomEl || roomList;
		$.ajax({
			type: "GET",
			url: 'room/list'
		}).done(function( msg ) {
			msg.forEach(function(room){
				roomEl.append('<li><a href="'+prefix+room.id+'" data-id="'+room.id+'"><i class="icon-align-justify"></i> '+room.id+'</a></li>');
			});
		});
	}

	//login form open
	loginButton.click(function(){
		loginContainer.modal();
	});
	//login form submit
	loginForm.submit(function(){
		loginError.html('');
		loginForm.removeClass('error');
		user.username = loginForm.find('.username').val();
		user.password = loginForm.find('.password').val();
		socket.emit('auth',user);
		return false;
	});


	//comment form submit handler
	form.submit(function() {
		var data = {
			message: message.val(),
			name: name.val(),
			room_id: currentRoom,
			img: 'https://si0.twimg.com/profile_images/2326165247/wulxf1wh0at7xo30km0a_reasonably_small.jpeg'
		};
		//render instantly for the user
		renderMsg(data);
		socket.emit('add', data);
		message.val('');
		return false;
	});


	//changes UI to join a room
	//makes the ajax request for the room
	//emits the socket join event
	function initRoom(room) {
		hideAll();
		currentRoom = room;
		roomName.html(room);
		roomUI.show();
		var obj = {
			type: "POST",
			url: 'comment/list',
			data: {
				room_id: room
			}
		};
		$.ajax(obj).done(function(room) {
			room.comments.forEach(renderMsg);
			socket.emit('join', {room_id: currentRoom});
            $('.draggable').draggable();
		}).error(function() {
			showList();
			$('.app-list .alert').html('Invalid Room Name').fadeIn().fadeOut(6000);
		});
	}

	//renders a message to a room
	function renderMsg(item) {
		if (!item) {return;}
		stream.prepend('<li class="comment draggable"><img src="'+item.img+'"><p><strong>'+item.name+'</strong>'+item.message+'</p></li>');
	}

	//shows the administrator tools
	function renderAdmin() {
		loginContainer.modal('hide');
		loginButton.remove();
		adminButton.show();
	}

	//renders the admin
	function showAdmin(tool) {
		hideAll();
		if (tool == 'rooms') {
			adminRooms.show();
			getRooms(adminRoomsList,'#admin/room/');
		}
	}

	//bind socket events
	socket.on('comment',function(data) {
		renderMsg(data);
	});
	socket.on('authsuccess',function(data){
		renderAdmin();
	});
	socket.on('authfail',function(data){
		loginError.html('Error, please try again.').show();
		loginForm.addClass('error');
	});


	//we use hashchange to trigger events so that back buttons work
	$(window).hashchange( function(){
		var location = window.location.hash;

		if (location.indexOf('#room/') != -1) {
			var room = location.replace('#room/','');
			initRoom(room);
			return;
		}
		if (location.indexOf('#admin/') != -1) {
			var tool = location.replace('#admin/','');
			showAdmin(tool);
			return;
		}
		//default to the list
		showList();
	});

	// Trigger the event on page load
	$(window).hashchange();


	$('.sortable').sortable();
    $('.droppable').droppable({
        drop: function( event, ui ) {
            $(this).find("li.placeholder" ).remove();
            var dragged = ui.draggable.remove();
            $(this).append(dragged.css({position: 'relative', top: 0, left: 0}));
        }
    });

}