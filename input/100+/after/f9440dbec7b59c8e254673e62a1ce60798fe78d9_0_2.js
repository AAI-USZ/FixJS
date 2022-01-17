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