function(data,dom){
		var html_table = ['<table class="table1"><tbody><tr><td class="td1">分区类型:</td><td>'];
		html_table.push(data.type_name);
		html_table.push('</td><td class="td1">设备:</td><td>');
		html_table.push(data.dev);
		html_table.push('</td></tr><tr><td class="td1">文件系统:</td><td>');
		html_table.push(data.fstype);
		html_table.push('</td><td class="td1">挂载点:</td><td>');
		html_table.push(data.mountpoint);
		html_table.push('</td></tr><tr><td class="td1">容量:</td><td>');
		html_table.push(data.size.total);
		html_table.push('</td><td class="td1">剩余空间:</td><td>');
		html_table.push(data.size.left)
		html_table.push('</td></tr></tbody></table>');
		dom.html(html_table.join(''));
	}