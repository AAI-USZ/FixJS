function(e) {
			if(e.status === 200) {
				GM_openInTab('http://exhentai.org/?f_shash=' + sha1Hash(s2ab(e.responseText)) + '&fs_similar=1&fs_exp=1', false, true);
			} else {
				GM_log('Error: ' + e.statusText);
			}
		}