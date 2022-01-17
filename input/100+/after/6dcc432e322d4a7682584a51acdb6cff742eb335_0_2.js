function(){
	$("#msgout").prop('disabled', true);
	$("#noscr").remove();
	
	var STYLES = [
		{ 'class':'lc', 'name':'светлый'},
		{ 'class':'dc', 'name':'темный' },
		{ 'class':'gc', 'name':'гламур' }
	];
	
	var SetStyle = function ( id ){
		document.cookie="style="+id+"; domain=raktv.ru; path=/; expires=Mon, 01-Jan-2018 00:00:00 GMT";
		var currStyle = STYLES[parseInt($("#chst").attr('slasid'))].class;
		var newStyle = STYLES[id].class;
		$("."+currStyle).removeClass(currStyle).addClass(newStyle);
		$("."+currStyle+"_a").removeClass(currStyle+"_a").addClass(newStyle+"_a");
		$("."+currStyle+"_b").removeClass(currStyle+"_b").addClass(newStyle+"_b");
		$("."+currStyle+"_brdr").removeClass(currStyle+"_brdr").addClass(newStyle+"_brdr");
		$("."+currStyle+"_chat").removeClass(currStyle+"_chat").addClass(newStyle+"_chat");
		$("."+currStyle+"_cap").removeClass(currStyle+"_cap").addClass(newStyle+"_cap");
		$("."+currStyle+"_mmbr").removeClass(currStyle+"_mmbr").addClass(newStyle+"_mmbr");
		$("."+currStyle+"_chat_clr").removeClass(currStyle+"_chat_clr").addClass(newStyle+"_chat_clr");
		$("#chst").html(STYLES[id].name);
		$("#chst").attr('slasid',id);
	}
	
	if( (typeof(document.cookie) != 'undefined') && (document.cookie.indexOf('style=') != -1) ){
		SetStyle(parseInt(document.cookie.substr(document.cookie.indexOf('style=')+6,1)));
	}
	
	$("#chst").bind("click", function(e){
		var currStyleID = parseInt($(this).attr('slasid'));
		if( typeof(STYLES[currStyleID+2]) == 'undefined'){
			SetStyle(0);
		}else{
			SetStyle(currStyleID+1);
		}
	});
	
	$("#shhi").bind("click", function(e){
		if($("#membersbox").is(":visible")){
			$("#shhi").html("показать юзер-панель");
			$("#membersbox").hide();
		}else{
			$("#shhi").html("скрыть юзер-панель");
			$("#membersbox").show();
		}
	});
	
	$("#sml img").bind("click", function(e){
		if( ($("#msgout").val().length + $(this).attr("tid").length) <= parseInt($("#msgout").attr('maxlength')) )
			$("#msgout").insertAtCaret($(this).attr("tid"));
	});
	
	$("#smiles").bind("click", function(e){
		$("#sml").toggle();
		$("#msgout").focus();
	});
	
	var find_nick = new RegExp('^\[[a-zA-Zа-яА-ЯеЁ0-9]+\]\,?');
	
	$("#membrs span, #chat span").live("click", function(e){
		var curr_msg = $("#msgout").val();
		if(find_nick.test(curr_msg)) curr_msg = curr_msg.replace(find_nick,'');
		$("#msgout").val("["+$.trim($(this).text())+"]," + curr_msg);
		$("#msgout").focus();
	});
	
	$('#scroll').tinyscrollbar();
	
	$(window).resize(function() {
		$('#scroll').tinyscrollbar_update('bottom');
	});
	
	var AddInChat = function( msg ){
		var firstDiv = $("#chat > div:first");
		firstDiv.hide();
		firstDiv.html(msg);
		$("#chat").append( firstDiv );
		firstDiv.show();
		$("#scroll").tinyscrollbar_update('bottom');
	}
	
	var AddMembr = function ( id, name ){
		$("#membrs").append("<span id='m"+id+"'>&nbsp;&nbsp;"+name+"</span> ");
	}
	
	var socket;
	
	try{
		socket = io.connect('http://pipe.raktv.ru');
	} catch(e) {
		AddInChat('<p>Ошибка соединения!<br />'+e.name+': '+e.message+'</p>');
		$("#msgout").prop('disabled', true);
	}
	
	var SENDBUFF = "";
	
	socket.on('connect', function () {
		$("#msgout").prop('disabled', false);
	});
	
	$('#msgout').keydown(function (e) {
		if ( (e.keyCode == 13) && ($("#msgout").prop('disabled')==false) ) {
			SENDBUFF = $("#msgout").val();
			$("#msgout").val("");
			socket.send(SENDBUFF);
			$("#msgout").prop('disabled', true);
		}
	});
	
	socket.on('message', function (msg) {
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
	});
	
	socket.on('reconnecting', function () {
		AddInChat('<p>Потерянна связь с чатом. Переподключаемся.</p>');
		$("#membrs").empty();
	});
	
	socket.on('error', function (e) {
		AddInChat('<p>Ошибка: ' + (e ? e.type : 'неизвестная ошибка') + '</p>');
	});
}