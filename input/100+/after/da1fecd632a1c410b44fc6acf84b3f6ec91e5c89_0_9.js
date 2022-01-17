function(){
	var urlParams = {};
	var debug=2;
	(function () {
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	    while (match = search.exec(query))
	       urlParams[decode(match[1])] = decode(match[2]);
	})();

var ifupdate_url=location.href.slice(0,29)=="http://www.douban.com/update/";
var voice_img = chrome.extension.getURL("ico-voice.gif");
var test_wav = chrome.extension.getURL("test.wav");
//这是一个全局变量，用来防止用户多次重复按下录音按钮的一个小东西
var reverse_clock=null;
var	getUserName = function(){
			if(ifupdate_url){
				var login_user=$(".pl:last a").attr("href").replace("/people/","").replace("/statuses","");
				return login_user;
			}
		},
	// HTML5 voice record demo
	//http://jsfiddle.net/DerekL/JV996/
	//以后可能也需要deffered化这一段代码，返回的无非就是一段BASE64的东西就可以了
	doRecord=function(){
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
	},
	//取得相关的文件信息，以及经过BASE64编码后的信息后，上传到服务器
	//TODO:
	//1、这里需要考虑的比较多，我决定先使用LOCALSTORAGE来模拟
	//2、这样同时也可以在本地加入缓存逻辑，如果有，则直接取LOCALSTORAGE，然后渲染就可以
	//3、重复上传的逻辑？如果两次录音不同，则抹掉，这倒是比较简单....
	//4、不过这里也出现了一个逻辑上的意味，即，如果上一次录音与这一次录音的HASH值完全相同
	//	 则可以用这种方式来避免同一条广播被重复提交
	uploadFile = function (id,base64) {
		var id=id || 'dbVoice_test';
		var base64File=undefined;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
		//如果有缓存则首先更新缓存
		if(localStorage.hasOwnProperty(id)){
			localStorage[id]=base64;
			deferred.resolve(true);
		}
		//然后需要构造一个XHR2对象并上传
		return promise;
	},
	//用FileReader将任何BLOB对象转换成BASE64编码
	//loadBlobToBase64(xhr.response).then(function(base64){});
	loadBlobToBase64=function(blob){
		var deferred = $.Deferred(); 
		var promise = deferred.promise();

		var reader = new FileReader();
		reader.onload = function() {
			  deferred.resolve(reader.result);
        }
       	reader.readAsDataURL(blob);
       	return promise;
	},
	renderUploader=function(){
			var li=$("#voice-name");
			var p = "<p width='300px' class='loader'></p>";
			li.after(p);
		//有两个功能性的BUG
		//1、第二次点击上传后，会重复加载的问题。。这个得改，换成HTML()方法也许可以
		//2、识别输入框，加入锚记的功能，另外也许还得搞定字数的问题
		var options={responseType:'blob',uri:test_wav};
		xhr2(options).then(function(xhr){

			loadBlobToBase64(xhr.response).then(function(base64){
				var dom=$('.loader');
	        		var src=" src='"+base64+"' ";
					var audio_tag="<audio autoplay controls "+ 
										src+
										//"id=audio_"+
										//Statue.data_sid+
										">";
					dom.html(audio_tag);
			      	//console.log(reader.result);
			    var text_obj=$('#isay-cont');
			    var text_label=$('#isay-label');
			    var label=text_label.html();
			    if (label==='说点什么吧...') {
			    //为空的情况下，清空LABLE，并加入自定义字体的标签
			    	text_label.html('');
			    	text_obj.text("؆");
			    }else{
			    //已经有内容了,则仅仅加入特殊字符标记
			    	console.log("saying is not null");
			    	var text=text_obj.text();
			    	text_obj.text(text+"؆");	
			    }
			    console.log("saying is not null?????"+label);			    
			});        		
				
		}, function(){
				console.log("error");
		});				

	},
	renderActField=function(){
		var field="<div class='field'>";
		var bd="<div class='bd'>";		
		var cancel_btn="<a href='javascript:void(0);' class='bn-x isay-cancel'>×</a>";
		var input="<input type='text' id='isay-inp-url'"+ 
	     		   "value='http://www.baidu.com' class='url' name='url'"+ 
	     		   "autocomplete='off' goog_input_chext='chext'>";
		var span_btn="<span class='bn-flat'>"+
						"<input type='button' value='录音'"+
						"class='bn-record'></span>";
		var upload_btn="<span class='bn-flat'>"+
				"<input type='button' value='上传'"+
				"class='bn-upload'></span>";
		var test="<input type='file' accept='audio/*;capture=microphone'>";
		var end_div="</div>";
		var result="<span id='voice-result'></span>";
		var name="<span id='voice-name'><p><div></div></p></span>​";
		var final_html=field+
						  bd+
		                    result+
		                    name+
		                   // test+
		                   cancel_btn+
		                    span_btn+upload_btn+
		                   end_div+
		               end_div;
		$("#isay-act-field").html(final_html);
		//$("#isay-act-field").show();
		$("#isay-act-field .field").show();
		//默认不显示上传
		$(".bn-upload").hide();
		//取消录音
		$("#isay-act-field .isay-cancel").click(function(){
				$("#isay-act-field .field").hide();
		});
		//录音	
		$("#isay-act-field .bn-record").click(function(){
						doRecord();
		});
		//上传	
		$("#isay-act-field .bn-upload").click(function(){
						renderUploader();
		});	
				
	},
	initVoiceAction=function(){
		//<a href="javascript:void(0);" tabindex="2" data-action="topic" 
		//class="ico ico-topic" title="添加话题">话题</a>
		var topic=$(".ico-topic");
			topic.after("<a href='javascript:void(0);' tabindex='4'"+
						"class='ico ico-voice' data-action='voice' "+
						"style='background:"+ 
						       "url("+voice_img+") "+
								"no-repeat 0 0;'"+
					    "title='添加语音'>语音</a>");
			var voice_btn=$(".ico-voice");

			voice_btn.bind("click",function(event){
				console.log("Voice Btn clicked");
				renderActField();
			});
			//对文件上传的两个小HACKS，一个是改变了我说未弹出前的右边距
			//这是两个HACKS，针对我们加入了自己的按钮后改变了人家原有的流程
			var file_uploder=$("#isay-upload");
				file_uploder.css({right: '72px'});
			//监听BTN-GROUP，如果长度改变了，说明db-isay展开了，加上处理的流程
			//即将右边距设置成120PX
			var btn_group=$('.btn-group');
			btn_group.bind('DOMSubtreeModified', function() {
 					var file_uploder=$("#isay-upload");
						file_uploder.css({right: '120px'});
    		
			});		
	},
	xhr2=function(options){
		var that=this;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();
        var xhr = new XMLHttpRequest(),
            method = options.method || 'get';
        xhr.responseType = options.responseType ||'blob';   

		xhr.onload = function() {
			deferred.resolve(xhr);
		};

        xhr.onerror = function(e) {
			deferred.reject(xhr, e);
        }
    
        xhr.open(method, options.uri);
        xhr.send();
    
        //xhr.send((options.data) ? urlstringify(options.data) : null);

		return promise;
	},
	//有则读缓存，无则取数据并存入当地
	//以后可以把这里的逻辑用WEBSQL来搞定，毕竟可以无限使用空间
	getFile=function(id){
		var id=id || 'dbVoice_test';
		var base64File=undefined;
		var deferred = $.Deferred(); 
		var promise = deferred.promise();

		if(localStorage.hasOwnProperty(id)){
			base64File=localStorage[id];
			deferred.resolve(base64File);
		}else{
			var options=undefined;
			//for debug			
			if (id==='dbVoice_test') {
				options={responseType:'blob',uri:test_wav};
			}else{
				//以后的URI就可以取实际的远程地址了
				options={responseType:'blob',uri:test_wav};
			}
			xhr2(options).then(function(xhr){
				loadBlobToBase64(xhr.response).then(function(base64){
					localStorage.setItem(id, base64);
					base64File=base64;
					deferred.resolve(base64File);
				});
			});
		}
		return promise;
	},
	renderPlayer=function(dom,base64File){
			var src=" src='"+base64File+"' ";
			var audio_tag="<audio autoplay controls "+ 
							src+
							//"id=audio_"+
							//Statue.data_sid+
							">";
			dom.html(audio_tag);
	},
	initPlayer=function(){
		var datatypehash={3043:"推荐单曲",1025:"上传照片",1026:"相册推荐",1013:"推荐小组话题",1018:"我说",1015:"推荐/新日记",1022:"推荐网址",1012:"推荐书评",1002:"看过电影",3049:"读书笔记",1011:"活动兴趣",3065:"东西",1001:"想读/读过",1003:"想听/听过"};

		var need_save_kind={1026:"相册推荐",1013:"推荐小组话题",1015:"推荐/新日记",1012:"推荐书评",3065:"东西",1025:"推荐相片"}

		$("div.status-item").each(function(){
			var myself=$(this);
				//优先判断是否为值得存取的类型
				//【存入数据库】类型
				var data_kind=myself.attr("data-object-kind");
				//【存入数据库】数据行为
				var data_action=myself.attr("data-action");
					if(debug==1){console.log("Action:"+data_action);}
			//============================================
				//打印人性化的提示信息
				var action=datatypehash[data_kind]===undefined?data_kind:datatypehash[data_kind];
					if(debug==1){console.log("Kind:"+action);}		
				//【数据库KEY】SID
				var data_sid=myself.attr("data-sid");
					if(debug==1){console.log("ID:"+data_sid);}
				//用户地址
				var user_url=myself.find("div.bd p.text a:first").attr("href");
					if(debug==1){console.log("user_url:"+user_url);}		
				//用户的昵称
				var user_name=myself.find("div.bd p.text a:first").html();
					if(debug==1){console.log("user_name:"+user_name);}
				//用户的发言
				var user_quote=myself.find("div.bd blockquote p").html();
					if(debug==1){console.log("user_quote:"+user_quote);}
				//【存入数据库】用户的唯一ID
				var user_uid=user_url.slice(29,-1);
					if(debug==1){console.log("user_uid:"+user_uid);}
				//【存入数据库】行为对象，div.bd p.text下的第二个a连接的href一般来说就是行为
				var data_object=myself.find("div.bd p.text a:eq(1)").attr("href");
					if(debug==1){console.log("行为对象:"+data_object);}
				//【存入数据库】行为对象的描述
				var data_description=myself.find("div.bd p.text a:eq(1)").html();
					if(debug==1){console.log("行为对象:"+data_description);}
				//【存入数据库？】时间对象？
				var time=myself.find("div.actions span.created_at").attr("title");
					if(debug==1){console.log("Time:"+time);}
				//生成一个全局对象ID的URL并存入数据库
				var uid_url=user_url+"status/"+data_sid;

				var Statue={};
					Statue.action=action;
					Statue.data_sid=data_sid;
					Statue.user_url=user_url;
					Statue.user_name=user_name;
					Statue.user_quote=user_quote;
					Statue.user_uid=user_uid;
					Statue.data_object=data_object;
					Statue.data_description=data_description;
					Statue.time=time;
					Statue.uid_url=uid_url;
			//to render player? or not
			if(Statue.user_quote!=null){
			  var ifPlayer=(Statue.user_quote.indexOf("؆")===-1)?false:true;
				if(ifPlayer){
					console.log("ifPlayer holder?"+ifPlayer);
					var user_quote_obj=myself.find("div.bd blockquote p");
					getFile().then(function(base64File){
						renderPlayer(user_quote_obj,base64File);
					});						
				}
			}//end of not user quote null
		//===========================================
		});//end of each itor
	},
	initUpdateView = function (){
			initVoiceAction();
			initPlayer();
	},
	router = function (){
		if(ifupdate_url){
			initUpdateView();
		}	
	}

	router();
 
}