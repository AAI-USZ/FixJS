function save_conf(obj)
	{
		setCookie(obj.attr("id"), obj[0].checked?1:0);
		sort_msg("该配置将在下次刷新页面后生效");
	}