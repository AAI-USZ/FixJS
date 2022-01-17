function() {
	// li跳转
	$('#J_TopNav ul li').die().live().bind("click", function(event) {
		var href = $(this).find('a').attr('href');
		var target = $(this).find('a').attr('target');
		if (target == '_blank') {
			window.open(href);
			return false;
		} else {
			window.location.href = href;
		}
	});	
	
	// 设置bread
	if (window.location.search) {
		var myCata1 = GetParameter('cata1');
		var myCata2 = GetParameter('cata2');
		var myCata3 = GetParameter('cata3');
		var myCata2Href;
		switch (myCata1) {
			case 'yygl':myCata1 = '医院概览';break;
			case 'xxzx':myCata1 = '信息中心';break;
			case 'hzfwzx':myCata1 = '患者服务中心';break;
			case 'ksdh':myCata1 = '科室导航';break;
			case 'zjjs':myCata1 = '专家介绍';break;
			case 'kyxs':myCata1 = '科研学术';break;
			case 'yywh':myCata1 = '医院文化和教育';break;
		}
		switch (myCata2) {		
			case 'yyjj':myCata2 = '医院简介';break;
			case 'zzjg':myCata2 = '组织结构';break;
			case 'yzjy':myCata2 = '院长寄语';break;
			case 'ldbz':myCata2 = '领导班子';break;
			case 'ywgk':myCata2 = '院务公开';break;
			case 'yyls':myCata2 = '医院历史';break;
			case 'zdjs':myCata2 = '重大记事';break;
			case 'lxwm':myCata2 = '联系我们';break;
			case 'yygg':myCata2 = '医院公告';myCata2Href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=yygg';break;
			case 'yyxw':myCata2 = '医院新闻';myCata2Href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=yyxw';break;
			case 'jtdt':myCata2 = '集团动态';myCata2Href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=jtdt';break;
			case 'dmtzx':myCata2 = '多媒体中心';break;
			case 'rczp':myCata2 = '人才招聘';break;
			case 'zbcg':myCata2 = '招标采购';myCata2Href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=zbcg';break;	
			case 'mzcx':myCata2 = '门诊查询';break;
			case 'jzzn':myCata2 = '就诊指南';break;
			case 'qtfw':myCata2 = '其它服务';break;
			case 'lcks':myCata2 = '临床科室';break;
			case 'sszd':myCata2 = '省市重点';break;
			case 'tszk':myCata2 = '特色专科';break;
			case 'yjks':myCata2 = '医技科室';break;
			case 'znks':myCata2 = '职能科室';break;
			case 'zjyl':myCata2 = '专家一览';break;
			case 'mymz':myCata2 = '名医门诊';break;
			case 'gjrc':myCata2 = '各级人才';break;
			case 'mzpb':myCata2 = '门诊排班信息';break;
			case 'kydt':myCata2 = '科研动态';break;
			case 'kjcg':myCata2 = '科技成果';break;
			case 'gxsb':myCata2 = '高新设备';break;
			case 'xsjl':myCata2 = '学术交流';break;
			case 'djtj':myCata2 = '党建团建';break;
			case 'hltd':myCata2 = '护理天地';break;
			case 'qnwmh':myCata2 = '青年文明号';break;
			case 'yyqk':myCata2 = '医院期刊';break;
			case 'jkdjt':myCata2 = '健康大讲堂';break;
			case 'kfsl':myCata2 = '康复沙龙';break;
		}
		switch (myCata3) {
			case 'xrld':myCata3 = '现任领导';break;
			case 'lrld':myCata3 = '历任领导';break;
			case 'zjcx':myCata3 = '专家查询';break;
			case 'jylc':myCata3 = '就医流程';break;
			case 'jyxz':myCata3 = '就医须知';break;
			case 'lyfb':myCata3 = '楼宇分布';break;
			case 'yygz':myCata3 = '医院规章';myCata2Href='/web/main/news/newsList2.shtml?cata1=hzfwzx&cata2=yygz';break;
			case 'tsfw':myCata3 = '特色服务';myCata2Href='/web/main/news/newsList2.shtml?cata1=hzfwzx&cata2=tsfw';break;
			case 'jtzn':myCata3 = '交通指南';break;
			case 'yygh':myCata3 = '预约挂号';break;
			case 'zxzxzx':myCata3 = '在线咨询中心';break;
			case 'hycx':myCata3 = '化验查询';break;
			case 'bssds':myCata3 = '博士生导师';break;	
			case 'sssds':myCata3 = '硕士生导师';break;	
			case '151':myCata3 = '151人才';break;	
			case '131':myCata3 = '131人才';break;	
			case 'nydjs':myCata3 = '南医大教授';break;	
			case 'nydfjs':myCata3 = '南医大副教授';break;	
			case 'zjsyxh':myCata3 = '浙江省医学会主委/副主委';break;	
			case 'hzsyxh':myCata3 = '杭州市医学会主委';break;	
		}
		$('.J_Cata1').html(myCata1);
		$('.J_Cata2').html(myCata2).attr('href',myCata2Href);	
		$('.J_Cata3').html(myCata3);	
	}
	
	//设置右侧导航
	var cata1 = $('.J_Cata1').html();
	var title;
	if(cata1 == '医院概览'){
		$('.titleType4').html('医院概览');
		title=" <li><a href='#'>集团导航</a></li>"+
                "<li><a href='/web/main/overview/overview.shtml?cata1=yygl&cata2=yyjj'>医院简介</a></li>"+
                "<li><a href='/web/main/overview/structure.shtml?cata1=yygl&cata2=zzjg'>组织结构</a></li>"+
                "<li><a href='/web/main/overview/dean.shtml?cata1=yygl&cata2=yzjy'>院长寄语</a></li>"+
                "<li><a href='/web/main/overview/leaderNow.shtml?cata1=yygl&cata2=ldbz&cata3=xrld'>领导班子</a>"+
                    "<ul class='subMenu'>"+
                        "<li><a href='/web/main/overview/leaderNow.shtml?cata1=yygl&cata2=ldbz&cata3=xrld'>现任领导</a></li>"+
                        "<li><a href='/web/main/overview/leaderPast.shtml?cata1=yygl&cata2=ldbz&cata3=lrld'>历任领导</a></li>"+
                    "</ul>"+
                "</li>"+
                "<li><a href='/web/main/news/newsList.shtml?cata1=yygl&cata2=ywgk'>院务公开</a></li>"+
                "<li><a href='/web/main/overview/history.shtml?cata1=yygl&cata2=yyls'>医院历史</a></li>"+
                "<li><a href='/web/main/news/newsList.shtml?cata1=yygl&cata2=zdjs'>重大记事</a></li>"+
                "<li><a href='/web/main/overview/contact.shtml?cata1=yygl&cata2=lxwm'>联系我们</a></li>";
	}
	if(cata1 =="信息中心"){
		$('.titleType4').html('信息中心');
		title="<li><a href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=yygg'>医院公告</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=yyxw'>医院新闻</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=jtdt'>集团动态</a></li>"+
		"<li><a href='/web/main/news/mediaCenter.shtml?cata1=xxzx&cata2=dmtzx'>多媒体中心</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=rczp'>人才招聘</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=xxzx&cata2=zbcg'>招标采购</a></li>";
	}
	if(cata1 =="患者服务中心"){
		$('.titleType4').html('患者服务中心');
		title="<li><a href='#'>门诊查询</a>"+
			        "<ul class='subMenu'>"+
			        "<li><a href='/web/main/patient/doctorSearch.shtml?cata1=hzfwzx&cata2=mzcx&cata3=zjcx'>专家查询</a></li>"+
			    "</ul>"+
			"</li>"+
			"<li><a href='#'>就诊指南</a>"+
			    "<ul class='subMenu'>"+
			        "<li><a href='/web/main/patient/process.shtml?cata1=hzfwzx&cata2=jzzn&cata3=jylc'>就医流程</a></li>"+
			        "<li><a href='/web/main/patient/attention.shtml?cata1=hzfwzx&cata2=jzzn&cata3=jyxz'>就医须知</a></li>"+
			        "<li><a href='/web/main/patient/building.shtml?cata1=hzfwzx&cata2=jzzn&cata3=lyfb'>楼宇分布</a></li>"+
			        "<li><a href='/web/main/news/newsList2.shtml?cata1=hzfwzx&cata2=jzzn&cata3=yygz'>医院规章</a></li>"+                       
			        "<li><a href='/web/main/news/newsList2.shtml?cata1=hzfwzx&cata2=jzzn&cata3=tsfw'>特色服务</a></li>"+
			        "<li><a href='/web/main/patient/add.shtml?cata1=hzfwzx&cata2=jzzn&cata3=jtzn'>交通指南</a></li>"+
			    "</ul>"+
			"</li>"+
			"<li><a href='#'>其它服务</a>"+
			    "<ul class='subMenu'>"+
			        "<li><a href='/web/main/patient/order.shtml?cata1=hzfwzx&cata2=qtfw&cata3=yygh'>预约挂号</a></li>"+
			        "<li><a href='/web/main/patient/consultIndex.shtml?cata1=hzfwzx&cata2=qtfw&cata3=zxzxzx'>在线咨询中心</a></li>"+
			        "<li><a href='/web/main/patient/assay.shtml?cata1=hzfwzx&cata2=qtfw&cata3=hycx'>化验查询</a></li>"+
			    "</ul>"+
			"</li>";
	}
	if(cata1 =="科室导航"){
		$('.titleType4').html('科室导航');
		title="<li><a href='/web/main/dept/deptList.shtml?cata1=ksdh&cata2=lcks'>临床科室</a></li>"+
		"<li><a href='/web/main/dept/deptList.shtml?cata1=ksdh&cata2=sszd'>省市重点</a></li>"+
		"<li><a href='/web/main/dept/deptList.shtml?cata1=ksdh&cata2=tszk'>特色专科</a></li>"+
		"<li><a href='/web/main/dept/deptList.shtml?cata1=ksdh&cata2=yjks'>医技科室</a></li>"+
		"<li><a href='/web/main/dept/deptList.shtml?cata1=ksdh&cata2=znks'>职能科室</a></li>";
	}
	if(cata1 =="专家介绍"){
		$('.titleType4').html('专家介绍');
		title="	<li><a href='../doctor/zjyl.shtml?cata1=zjjs&cata2=zjyl'>专家一览</a></li>"+
				"<li><a href='../doctor/mymz.shtml?cata1=zjjs&cata2=mymz'>名医门诊</a></li>"+
				"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=bssds'>各级人才</a>"+
					"<ul class='subMenu'>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=bssds'>博士生导师</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=sssds'>硕士生导师</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=151'>151人才</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=131'>131人才</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=nydjs'>南医大教授</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=nydfjs'>南医大副教授</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=zjsyxh'>浙江省医学会主委/副主委</a></li>"+
						"<li><a href='../doctor/gjrc.shtml?cata1=zjjs&cata2=gjrc&cata3=hzsyxh'>杭州市医学会主委</a></li>"+
					"</ul></li>"+
				"<li><a href='../doctor/mzpb.shtml?cata1=zjjs&cata2=mzpb'>门诊排班信息</a></li>";		
	}
	if(cata1 =="科研学术"){
		$('.titleType4').html('科研学术');
		title="<li><a href='/web/main/news/newsList.shtml?cata1=kyxs&cata2=kydt'>科研动态</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=kyxs&cata2=kjcg'>科技成果</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=kyxs&cata2=gxsb'>高新设备</a></li>"+
		"<li><a href='/web/main/news/newsList.shtml?cata1=kyxs&cata2=xsjl'>学术交流</a></li>";		
	}
	if(cata1 =="医院文化和教育"){
		$('.titleType4').html('医院文化和教育');
		title="<li><a href='/web/main/news/newsList.shtml?cata1=yywh&cata2=djtj'>党建团建</a></li>"+
			   "<li><a href='/web/main/news/newsList.shtml?cata1=yywh&cata2=hltd'>护理天地</a></li>"+
			   "<li><a href='/web/main/news/newsList.shtml?cata1=yywh&cata2=qnwmh'>青年文明号</a></li>"+
			   "<li><a href='/web/main/culture/periodical.shtml?cata1=yywh&cata2=yyqk'>医苑期刊</a></li>"+
			   "<li><a href='/web/main/news/newsList.shtml?cata1=yywh&cata2=jkdjt'>健康大讲堂</a></li>"+
			   "<li><a href='/web/main/news/newsList.shtml?cata1=yywh&cata2=kfsl'>康复沙龙</a></li>";		
	}
	
	$('#J_TitleLi').html(title);
	
	//右侧导航当前项定位	
	$('#J_TitleLi li a').each(function(){
		var myCata2 = GetParameter('cata2');
		var myCata3 = GetParameter('cata3');
		var isCata3=false;//是否为3级目录
		if($(this).parent().parent().hasClass('subMenu')){
			isCata3=true;
		}
		if(myCata3 && isCata3){			
			if(getParaStr($(this).attr('href'),'cata3')==myCata3){
				$(this).addClass('now');					
			}		
		}
		if(myCata2 && !isCata3){				
			if(getParaStr($(this).attr('href'),'cata2')==myCata2){
				$(this).addClass('now');				
			}	
		}
	});
}