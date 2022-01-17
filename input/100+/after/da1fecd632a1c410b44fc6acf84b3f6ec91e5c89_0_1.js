function(){
    var obj = {}, txt="";
        obj = {
            video: false,
            audio: true
        };
        txt = "<audio controls autoplay>";
    if (reverse_clock===null) {
    navigator.webkitGetUserMedia(obj, function(stream) {
        $("#voice-result").empty();       
        stream.onended=function(){
        	console.log("Hi...I am end");
        	console.log(stream);
        	var output = $(txt).appendTo("#voice-result")[0];
        }
        //设置一个倒计时
        $("#voice-result").after("<span id='voice-clock'>14</span>");
        var clock=$('#voice-clock');
        reverse_clock=setInterval(function(){
        	var time=parseInt(clock.html());
        	clock.html(time-1)
        },1000);
        //14秒钟后停止倒计时，并REMOVE钟表元素
        //todo:可以在14秒后把录音按钮写成重录...另外在录音未完结前，不显示上传按钮
        //另外考虑一下用户有可能会重复上传时的逻辑
        setTimeout(function(){        	
        	stream.stop();
        	clearInterval(reverse_clock);
        	clock.remove();
        	reverse_clock=null;
        	$(".bn-upload").show();
        },2000);
    }, function(err) {
        console.log(err);
        err.code == 1 && (alert("可以再次点击录音，直到你想好了为止"))
    });
	}//end of if of reverse_clock 
	}