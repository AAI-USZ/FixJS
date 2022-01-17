function(orig_params)
	{
		var i=0;
		var tmp='',header='',body='',up='',visible='';
		names = {};
		
		
		tmp += '<div class="left_menu_div">';

        var params = {first: {name: 'fsearch'}};
        for (var k in orig_params) params[k] = orig_params[k];

		//alert('called');
		
		for(var k in params)
		{
			i++;
			
			if(!params[k]['name']) params[k]={name: params[k]};
			
			names[i]=params[k]['name'];
			
			var p = params[k];
			
			switch(p['name'])
			{
			default:
			case 'common':
				header='Common';
				body='';
				if(E.copied)
				{
					body+=add_link("javascript:E.paste_items();",'Paste items here','paste','Paste');
					/*if(E.op=='copy') body+=add_link("javascript:E.advanced_paste();",'Paste items in several steps','paste','Paste <i>big files, experimental</i>');*/
					body+=add_link("javascript:E.cancel_copy();",'Cancel '+E.op,'cancel','Cancel '+E.op);
				}
				body+=add_link("javascript:E.mkfile();",'Create a file','mkdir','Create a file');
				body+=add_link("javascript:E.mkdir();",'Create a folder','mkdir','Create a directory');
				//body+=add_link("javascript:E.open_terminal();",'Open terminal window to execute shell commands','rename','Open terminal');
				/* TODO: make a better uploads */
				//body+=add_link("javascript:I.show_upload();",'Upload files','upload','Upload files');
				//body+='<form enctype="multipart/form-data" style="display:none; margin: 0px; padding: 0px;" id="upload_form"><div id="uploads_container"></div><div align="right" style="padding-bottom: 3px;"><a href="javascript:I._append_upload();" style="text-decoration: underline;">add more files...</a></div><button type="button" style="font-size: 10px;" onclick="E.upload_files();return false;"><b>upload'+(upload_max_filesize?' ('+upload_max_filesize+' max)':'')+'</b></button></form>';
				break;
			case 'fsearch':
				header='Filename filter';
				T._search_str_default = 'Enter part of filename...';
				if(!T._search_str) T._search_str = T._search_str_default; // the search string
				body='<input type=text name="fsearch" id="fsearch" class="fsearch_g" onkeyup="/*setTimeout is to prevent IE crash =) */if(window.search_timeout) clearTimeout(window.search_timeout); window.search_timeout = setTimeout(function(){ L._search_str=document.getElementById(\'fsearch\').value;D.apply_filter();}, 0);" onfocus="if(this.value==\''+T._search_str_default+'\') this.value=\'\';this.className=\'fsearch\'" onblur="this.className=\'fsearch_g\';if(this.value==\'\') this.value=\''+T._search_str_default+'\';" value="'+T._search_str+'">';
				break;
			case 'operations': // all items are taken from the main frame
				var s /* selected */ = R.gsi();
				
				
				
				header='Common operations';
				
				if(s.length == 1)
				{
					s = s[0];
					
					if(p['type'] == 1)
					{
						body = add_link("javascript:E.rename_item();",'Set another name to current file','rename','Rename file');
						body += add_link("javascript:E.cut_item();",'Move file to another place','cut','Cut file');
						
						body += add_link("javascript:E.copy_item();",'Make a copy of file','copy','Copy file');
						
						body += add_link("javascript:E.download_file();",'Download the selected file to your computer','upload','Download file');
						
						body += add_link("javascript:E.delete_item();",'Remove the file from computer','delete','Delete file');
						if(E.get_extension(s) == 'zip')
						{
							body += add_link("javascript:E.unzip_item(&quot;extract_here&quot;);",'Extract contents here','zip','Extract here');
							var lon = E.basename(s);
							lon = lon.substr(0, lon.length-4);
							var shor = lon.length>12 ? lon.substr(0,9) + '...' : lon;
							
							body += add_link("javascript:E.unzip_item(&quot;extract&quot;);",'Extract to &quot;'+lon+'/&quot;','zip','Extract to &quot;' + shor + '/&quot;');
						}else
						{
							body += add_link("javascript:E.zip_item();",'Add file to zip','zip','Add to zip');
						}
						
						//alert(p['type']);
						
						body += add_link("javascript:E.show_properties();",'Show file properties','admin','Show Properties');
					}else
					{
						body = add_link("javascript:E.rename_item();",'Set another name to current directory','rename','Rename folder');
						body += add_link("javascript:E.cut_item();",'Move directory to another place','cut','Cut folder');
						
						body += add_link("javascript:E.copy_item();",'Make a copy of directory','copy','Copy folder');
						
						body += add_link("javascript:E.delete_item();",'Remove the directory from computer','delete','Delete folder');
						body += add_link("javascript:E.zip_item();",'Add directory to zip','zip','Add to zip');
						
						body += add_link("javascript:E.show_properties();",'Show directory properties','admin','Show Properties');
					}
				}else
				{
					body += add_link("javascript:E.cut_items();",'Move items to another place','cut','Cut items');
					
					body += add_link("javascript:E.copy_items();",'Make copy of items','copy','Copy items');
					
					/*body += add_link("javascript:E.download_files();",'Download the selected items to your computer','upload','Download file');*/
					
					body += add_link("javascript:E.delete_items();",'Remove the items from computer','delete','Delete items');
					/*if(E.get_extension(s['fullpath']) == 'zip')
					{
						body += add_link("javascript:E.unzip_item(&quot;extract_here&quot;);",'Extract contents here','zip','Extract here');
						var lon = E.basename(s['fullpath']);
						var lon = lon.substr(0, lon.length-4);
						shor = lon.length>12 ? lon.substr(0,9) + '...' : lon;
						
						body += add_link("javascript:E.unzip_item(&quot;extract&quot;);",'Extract to &quot;'+lon+'/&quot;','zip','Extract to &quot;' + shor + '/&quot;');
					}else
					{
						
					}
					*/
					
					body += add_link("javascript:E.zip_items();",'Add items to zip','zip','Add to zip');
					
					body += add_link("javascript:E.show_properties();",'Show properties of items','admin','Show Properties');
				}
				break;
			case 'details': // params: { filename, dir, type, changed, size, thumb }
				header='Details';
				
				if(p['thumb']) body=p['thumb'];
				else body='';
				
				body+='<b style="'+( /*document.all && !window.opera /* stupid IE doesn't understand, what does the overflow of element without width mean */ true ? 'width: 200px;' : '')+'overflow: hidden; display: block;">'+p['filename']+'</b>';
				
				if(p['dir']) p['type'] = 'Directory';
				
				if(p['type']) body+=p['type'] + '<br><br>';
				else body += '<br>';
				
				if(p['selnum']) body+=p['selnum'] + ' items<br><br>';
				
				if(p['id3']) body+=p['id3']+ '<br><br>';
				
				if(p['fs']) body+='Filesystem: ' + p['fs'] + '<br><br>';
				if(p['free']) body+='Free disk space: ' + p['free']+ '<br><br>';
				if(p['total']) body+='Total disk space: ' + p['total']+ '<br><br>';				
				
				if(p['changed']) body+='Changed: '+p['changed']+ '<br><br>';
				if(p['owner']) body+='Owner: '+p['owner']+'<br><br>';
				if(p['group']) body+='Group: '+p['group']+'<br><br>';
				if(p['rights']) body+='Rights: '+p['rights']+'<br><br>';
				if(p['link'])
				{
					body+='Links to: <a href="" onclick="E.go2(unescape(&quot;'+escape(p['link_raw'])+'&quot;)); return false;" title="'+p['link']+'">'+p['link']+'</a><br><br>';
				}
				
				if(p['size']) body+='Size: <span id="_dirsize">'+p['size']+ '</span><br><br>';
				else if(p['dir']) body+='Size: <span id="_dirsize"><a href="javascript:E.show_dir_size(false);" style="text-decoration: underline;">click to show size</a></span>'+ '<br><br>';
				
				body = body.substr(0,body.length-4);
				if(body.substr(body.length,body.length-4) == '<br>') body = body.substr(0,body.length-4);
				
				break;
			case 'long text':
				header='phylosophy';
				body='long text should be here';
				
				break;
			}
			
			up = hidden[p['name']] ? 'l_darr' : 'l_uarr';
			var displ = up=='l_uarr' ? '' : ' style="display: none;"'
			
			tmp+='<div class="left_menu_head"><span onclick="L._hide('+i+');">'+header+'</span></div>\
			\
			<div class="left_menu_body" id="b'+i+'" border=0'+displ+'>'+body+'</td><td width=12><img src="f/i/no.png" width=12 height=1></div>';
		}
		
		tmp += '</div>';
		
		document.getElementById('left_menu').innerHTML=tmp;
	}