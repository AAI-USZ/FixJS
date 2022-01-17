function showSortTable(obj, network_flag)
	{
		$("table.ta_list").find("tr[sort]").remove();
		var table_obj = $("table.ta_list").find("tr").first();
		var clone_obj = $("table.ta_list").find("tr").has("td.del img").first();
		var i = 0;
		var j = 0;
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
				var tr_temp = clone_obj.clone();
				$(tr_temp).attr("class", (j%2)?"list_bm":"list_bm no_bg");
				var tempa = $(tr_temp).find("td.del span.pr20 a[ajax]");
				tempa.html("score for "+uid);
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
				$(tr_temp).find("span.pr20 a").each(function(){autoAjax($(this), temp_url);});
				$(tr_temp).find("td.del").click(function(){objToggle($(this))});
				$(tr_temp).find("td.del").mouseout(function(){clearFiv($(this))});
				$(tr_temp).find("span.fires_icon").mouseover(function(){giveFive($(this), 0);});
				$(tr_temp).find("span.fires_icon").click(function(){giveFive($(this), 1);});
				
				$(tr_temp).find("td[align='center'][style]").html("Top "+ (j+1));
				$(tr_temp).find("td.del_name").html("hwface");
				$(tr_temp).find("td[align='right'][style]").html("心动指数:"+cent);
				$(tr_temp).attr("sort", (network_flag)?"net":"local");
				table_obj.before(tr_temp);
				j++;
			}
		}
	}