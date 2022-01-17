function (msg) {
		switch(msg.event){
			case 'newmsg':
				AddInChat(msg.text);
			break
			case 'msganswr':
				$("#msgout").prop('disabled', false);
				if(msg.status == "error") {
						AddInChat("<p>Ваше сообщение не отправлено. Детали: "+msg.detail+"</p>");
						$("#msgout").val(SENDBUFF);
						$("#msgout").focus();
				} else if(msg.status == "ok") {
						AddInChat(msg.text);
						$("#msgout").val("");
				}else{
					AddInChat("<p>Странная ошибка. Попробуйте еще раз.</p>");
					$("#msgout").val(SENDBUFF);
				}
			break
			case 'title':
				$(document).attr('title', msg.text);
			break
			case 'caption':
				$("#captnm").html(msg.text);
			break
			case 'player':
				$("#player").html(msg.text);
			break
			case 'site':
				$("#linksite").attr('href', msg.link);
				$("#linksite").html(msg.name);
			break
			case 'style':
				SetStyle(parseInt(msg.style));
			break
			case 'refresh':
				window.location.reload();
			break
			case 'gosite':
				window.location.href=msg.link;
			break
			case 'clear':
				$("#chat > div").each(function() { $(this).empty(); });
				$('#scroll').tinyscrollbar_update('bottom');
			break
			case 'lastmsg':
				$.each(msg.chatarg, function(index, value) { AddInChat(value); });
			break
			case 'deletem':
				$("#m"+msg.id).remove();
			break
			case 'addm':
				AddMembr(msg.id,msg.name);
			break
			case 'firstmsg':
				$(document).attr('title', msg.title);
				$("#captnm").html(msg.caption);
				$("#linksite").attr('href', msg.link);
				$("#linksite").html(msg.site);
				$.each(msg.membrs, function(index, value) { AddMembr(value,index); });
				$.each(msg.chat, function(index, value) { if(value != '') AddInChat(value); });
				$("#player").html(msg.player);
			break
		}
	}