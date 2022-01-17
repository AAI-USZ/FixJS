function($)
{
	var vote_url = "http://hwface.sinaapp.com/vote.php";	
	var sort_url = "http://hwface.sinaapp.com/sort.php";
	var giveFiveStr = "<span class=\"fires_icon\" cent=1 lock=0 title=\"一般一般\" style=\"opacity: 0.4; \">&nbsp;</span>" +
					"<span class=\"fires_icon\" cent=2 lock=0 title=\"可以可以\" style=\"opacity: 0.4; \">&nbsp;</span>" +
					"<span class=\"fires_icon\" cent=3 lock=0 title=\"不错不错\" style=\"opacity: 0.4; \">&nbsp;</span>" +
					"<span class=\"fires_icon\" cent=4 lock=0 title=\"来电咯\" style=\"opacity: 0.4; \">&nbsp;</span>" +
					"<span class=\"fires_icon\" cent=5 lock=0 title=\"女神下凡\" style=\"opacity: 0.4; \">&nbsp;</span>" +
					"<a id=\"votemsg\"></a><div id='content' style='display: none;'><div id='url'>#url#</div></div>";
	var new_button_str = "&nbsp;<input id='local_sort' class='text_button mt5' type='button' value='本地排行'>&nbsp;" +
					"&nbsp;<input id='net_sort' class='text_button mt5' type='button' value='网络榜单'>&nbsp;" +
					"&nbsp;<input type='checkbox' id='auto_expand' name='conf'>自动展开&nbsp;"+
					"&nbsp;<input type='checkbox' id='only_attach' name='conf'>只显示附件&nbsp;" +
					"<div id='sort_msg' style='display: none;'></div>";
					
	var pic_hot = "http://xinsheng-image.huawei.com/cn/forumimage/data/uploads/2010/1213/22/4d0627ac71298.gif";
	var pic_nor = "http://xinsheng-image.huawei.com/cn/forumimage/data/uploads/2010/1213/22/4d0627059851c.gif"
	var hwface = unSerialize(getCookie("hwface"));
	var sort_obj = new Array();
	
	function setCookie(c_name,value,expiredays)
	{
		var exdate=new Date()
		//cookie 有效时间十年
		exdate.setDate(exdate.getDate()+(expiredays==null)?3650:expiredays)
		document.cookie=c_name+ "=" +escape(value)+ ";expires="+exdate.toGMTString();
		//cookie 有效时间：session
		//exdate.setDate(exdate.getDate()+expiredays);
		//document.cookie=c_name+ "=" +escape(value)+	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}

	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1 
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		 }
		return ""
	}
	
	function unSerialize(str)
	{
		var cookie_str = decodeURIComponent(str);
		cookie_str = cookie_str.replace(/=/g,":");
		cookie_str = cookie_str.replace(/&/g,",");
		return eval("tempobj={"+cookie_str+"}");
	}
	
	//入口$("td.del")
	function getPicContent(obj, msg)
	{
		//<div class="floorBox_right_T">
		var content = $(msg).find("div.floorBox_right_T").html();
		//<div class="img_resize restore_C gut_style" rel="content">
		obj.find("div#content").append(content);
		if ($("input#only_attach")[0].checked)
		{
			obj.find("div.img_resize.restore_C.gut_style").hide();
		}
		obj.find("div.img_resize.restore_C.gut_style div.cl").css("white-space","normal");
		obj.find("div#content img[data-ks-lazyload]").each(function(){
			$(this).attr("src", $(this).attr("data-ks-lazyload"));
		});
	}
	
	//入口$("td.del")
	function objToggle(obj)
	{
		var obja = obj.find("a[ajax]");
		var url = obj.find("div#url").text();
		if (obja.attr("ajax") == 0)
		{
			obja.attr("ajax", "1");
			//第一次点击的时候才会去请求数据，防止对服务器并发太多
			$.ajax({ url:url, async:false, success: function(msg){getPicContent(obj, msg)}});
		}
		obj.find("div#content").slideToggle("slow");
	}
	
	//入口$("span.pr20 a")
	function autoAjax(obj, url)
	{
		//防止对服务器造成过大的并发，不一次性请求所有数据，在objToggle里面点一次，请求一个。
		if ($("input#auto_expand")[0].checked )
		{
			obj.attr("ajax", "1");
			$.ajax({ url:url, success: function(msg){getPicContent(obj, msg)}});
			obj.parent("span.pr20").find("div#content").show();
		}
		else
		{
			obj.parent("span.pr20").find("div#content").hide();
		}
	}
	
	//入口$("span.pr20 a")
	function getPic(obj)
	{
		if (!obj || !obj.html() || !obj.parents("td.del").length || !obj.parents("td.del").has("img").length)
		{
			return;
		}
		var url = obj.attr("href");
		obj.attr("ajax", "0");
		temp_str = giveFiveStr.replace(/#url#/, url);
		obj.append(temp_str);
		autoAjax(obj, url);
		obj.removeAttr("href");

		//http://xinsheng.huawei.com/cn/index.php?app=forum&amp;mod=Detail&amp;act=index&amp;id=884633
		var match = url && url.match(/.*id=([0-9]*)/i);
		var uid = match && match[1];
		if (uid)
		{
			obj.attr("uid", uid);
			var cent = hwface[uid];
			if (cent)
			{
				showLastResult(obj.find("span.fires_icon"), cent);
			}
		}
	}
	
	//入口$("span.fires_icon[cent=5]")
	function vote_msg(obj, msg)
	{
		obj.parent("span.pr20 a").find("a#votemsg").html(msg);
		obj.parent("span.pr20 a").find("a#votemsg").fadeTo("fast",1);
		obj.parent("span.pr20 a").find("a#votemsg").fadeTo(3000,0);
	}
	
	//入口$("td.del a[ajax] span.fires_icon")
	function showLastResult(obj, cent)
	{
		var temp_obj;
		var i = 0;
		if (cent < 0 && cent > 5)
		{
			return ;
		}
		for (i = 1; i <= 5; i++)
		{
			temp_obj = obj.parent("span.pr20 a").find("span.fires_icon[cent="+i+"]");
			temp_obj.fadeTo("fast",(i <= cent)?1:0.4);
			temp_obj.attr("lock",1);
		}
	}
	
	//入口$("td.del a[ajax] span.fires_icon")
	function vote_to_server(obj)
	{
		var str = "cent=" + obj.attr("cent") + "&uid=";
		var url = obj.parent("span.pr20 a").find("div#url").text();
		
		var newToken = obj.parent("span.pr20 a").attr("uid");
		
		if (newToken)
		{
			str = str + newToken;
			
			var obja = obj.parent("span.pr20 a[ajax]");
			if (obja.attr("ajax") == 1)
			{
				obj.parent("span.pr20 a").find("div#content img[data-ks-lazyload]").each(function()
				{
					str = str + "&img[]=" + $(this).attr("data-ks-lazyload");
				});			
			}
			
			var temp_obj = obj.parent("span.pr20 a").find("span.fires_icon[cent=5]");
			$.ajax({
				url: vote_url,
				//async: false,
				data: str,
				type: "POST",
				dataType:"jsonp",
				jsonp:"callback",
				jsonpCallback:"success_jsonpCallback",
				success: function(msg)
				{
					vote_msg(temp_obj, "感谢投票,目前平均分:"+msg["new_cent"]+".");
					showLastResult(obj, msg["new_cent"]);
				},
				error: function(msg)
				{
					vote_msg(temp_obj, "暂时无法连接投票服务器");
				}
			});
		}
	}
	
	//入口$("span.fires_icon")
	//flag 0, 临时暂时; flag 投票结果
	function giveFive(obj, flag)
	{
		var temp_obj;
		var vote = 0;
		var i = 0;
		for (i = 1; i <= 5; i++)
		{
			temp_obj = obj.parent("span.pr20 a").find("span.fires_icon[cent="+i+"]");
			if (i <= obj.attr("cent") && temp_obj.attr("lock") == 0)
			{
				temp_obj.fadeTo("fast",1);
				vote = 1;
			}
			if (flag == 1)
			{
				temp_obj.attr("lock",1);
			}
		}
		if (flag == 1)
		{
			if (vote == 1)
			{
				if (obj.parent("span.pr20 a") && obj.parent("span.pr20 a").attr("uid"))
				{
					var uid = obj.parent("span.pr20 a").attr("uid");
					hwface[uid] = obj.attr("cent");					
					setCookie("hwface", $.param(hwface, false));//
				}
				vote_to_server(obj);
				//vote_msg(temp_obj, "感谢投票");
			}
			else
			{
				temp_obj = obj.parent("span.pr20 a").find("span.fires_icon[cent=5]");
				vote_msg(temp_obj, "不能重复投票");
				
			}
		}
	}
	
	//入口$("td.del")
	function clearFiv(obj)
	{
		obj.find("span.fires_icon[lock=0]").fadeTo("fast",0.4);
	}
	
	//入口 network_flag?json对象:hwface
	function showSortTable(start_pos, end_pos, total_len, network_flag)
	{
		$("table.ta_list").find("tr[sort]").remove();
		var table_obj = $("table.ta_list").find("tr").first();
		var clone_obj = $("table.ta_list").find("tr").has("td.del img").first();
		var i = 0;
		for (i = start_pos; i < end_pos; i++)
		{
			uid = sort_obj[i]["uid"];
			cent = sort_obj[i]["cent"];
			count = sort_obj[i]["count"];
			
			var tr_temp = clone_obj.clone();
			$(tr_temp).attr("class", (i%2)?"list_bm":"list_bm no_bg");
			var tempa = $(tr_temp).find("td.del span.pr20 a[ajax]");
			tempa.attr("title", "心动女生: "+uid)
			tempa.html(tempa.attr("title"));
			tempa.attr("uid", uid);
			tempa.attr("ajax", 0);
			temp_url = "http://xinsheng.huawei.com/cn/index.php?app=forum&mod=Detail&act=index&id=" + uid;
			temp_str = giveFiveStr.replace(/#url#/, temp_url);
			tempa.append(temp_str);
			
			if (network_flag && hwface[uid])
			{
				showLastResult($(tr_temp).find("td.del a[ajax] span.fires_icon").first(), hwface[uid]);
			}
			else if (!network_flag)
			{
				showLastResult($(tr_temp).find("td.del a[ajax] span.fires_icon").first(), cent);
			}
			//更换图片
			$(tr_temp).find("td.del img").attr("src", (i < 10)?pic_hot:pic_nor);
			$(tr_temp).find("span.pr20 a").each(function(){autoAjax($(this), temp_url);});
			$(tr_temp).find("td.del").click(function(){objToggle($(this))});
			$(tr_temp).find("td.del").mouseout(function(){clearFiv($(this))});
			$(tr_temp).find("span.fires_icon").mouseover(function(){giveFive($(this), 0);});
			$(tr_temp).find("span.fires_icon").click(function(){giveFive($(this), 1);});
			
			$(tr_temp).find("td[align='center'][style]").html("Top "+ (i+1));
			$(tr_temp).find("td.del_name").html("hwface");
			$(tr_temp).find("td[align='right'][style]").html("心动指数:"+cent);
			$(tr_temp).attr("sort", (network_flag)?"net":"local");
			table_obj.before(tr_temp);
		}
		if (end_pos == total_len)
		{
		
		}
		else
		{
		}
		//table_obj.before("<tr><td clospan=4>test</td></tr>");
		//$("td[clospan=4]").parent("tr").addClass("list_bm no_bg")
		//$("table.ta_list").find("tr:not([sort])").first().before("<tr><th clospan=4></th></tr>")
	}
	
	//入口 network_flag?json对象:hwface
	function obj_sort_func(obj, network_flag)
	{
		var i = 0;
		var j = 0;
		var cent = 0;
		var count = 1;
		sort_obj = new Array();
		for (i = 50, j = 0; i >= 1 && j < 100; i--)
		{
			for (uid in obj)
			{
				if (network_flag)
				{
					cent = obj[uid]["avg"];
					count = obj[uid]["count"];
				}
				else
				{
					cent = obj[uid];
					if (i %10){continue;}
				}
				if (cent*10 != i || j >= 100){continue;}

				sort_obj[j] = new Array();
				sort_obj[j]['uid'] = uid;
				sort_obj[j]['cent'] = cent;
				sort_obj[j]['count'] = count;
				j++;
			}
		}
	}

	//string
	function sort_msg(msg)
	{
		$("div#sort_msg").html(msg);
		$("div#sort_msg").show();
		$("div#sort_msg").fadeOut(3000);
	}

	function local_sort(obj)
	{
		//sort_msg("本地排行功能暂时未开放");
		if ($("table.ta_list").find("tr[sort]") && $("table.ta_list").find("tr[sort]").attr("sort") == "local")
		{return;}
		obj_sort_func(hwface);
		showSortTable(0, sort_obj.length, sort_obj.length);
	}
	
	function net_sort(obj)
	{
		//sort_msg("网络榜单功能暂时未开放");	
		if ($("table.ta_list").find("tr[sort]") && $("table.ta_list").find("tr[sort]").attr("sort") == "net")
		{return;}
		$.ajax({
			url: sort_url,
			type: "POST",
			dataType:"jsonp",
			jsonp:"callback",
			jsonpCallback:"success_jsonpCallback",
			success: function(msg)
			{
				obj_sort_func(msg, 1);
				showSortTable(0, sort_obj.length, sort_obj.length, 1);
			},
			error: function(msg)
			{
				sort_msg("暂时无法连接投票服务器");
			}
		});
	}
	
	//入口$("input[name='conf']")
	function save_conf(obj)
	{
		setCookie(obj.attr("id"), obj[0].checked?1:0);
		sort_msg("该配置将在下次刷新页面后完全生效");
	}
	
	//$("input#auto_expand")
	function auto_expand_click(obj)
	{
		if (obj[0].checked)
		{
			alert("“自动展开”配置启用后，将会降低加载速度，并会对服务器造成一定的压力。\n\n请慎重使用!!!");
		}
		save_conf(obj);
	}
	
	//$("input#only_attach")
	function only_attach_click(obj)
	{
		if ($("input#only_attach")[0].checked)
		{
			$("div.img_resize.restore_C.gut_style").hide();
		}
		else
		{
			$("div.img_resize.restore_C.gut_style").show();
		}
		save_conf(obj);
	}
	
	//score board
	$("input[value='发表新帖']").after(new_button_str);
	$("input#local_sort").click(function(){local_sort($(this));});
	$("input#net_sort").click(function(){net_sort($(this));});
	$("input#auto_expand")[0].checked = getCookie("auto_expand")*1;
	$("input#only_attach")[0].checked = getCookie("only_attach")*1;
	$("input#auto_expand").change(function(){auto_expand_click($(this));});
	$("input#only_attach").change(function(){only_attach_click($(this));});
	//
	$("span.pr20 a").each(function(){getPic($(this));});
	$("td.del").click(function(){objToggle($(this))});
	$("td.del").mouseout(function(){clearFiv($(this))});
	$("span.fires_icon").mouseover(function(){giveFive($(this), 0);});
	$("span.fires_icon").click(function(){giveFive($(this), 1);});

	//hot 地址 http://xinsheng-image.huawei.com/cn/forumimage/data/uploads/2010/1213/22/4d0627ac71298.gif
	//pai 地址 http://xinsheng-image.huawei.com/cn/forumimage/data/uploads/2010/1213/22/4d0627059851c.gif
}