function (e) {
			if (e.keyCode == 13 && GLBLSND==false) {
				GLBLSND=true;
				SENDBUFF = $("#msgout").val();
				$("#msgout").val("");
				socket.send(SENDBUFF);
				$("#msgout").prop('disabled', true);
			}
		}