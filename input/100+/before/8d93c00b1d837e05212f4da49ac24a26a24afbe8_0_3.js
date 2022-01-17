function ( err, files ) {
		if(err === null) {
			out.writeHead(300, { 'Content-Type': 'html' });
			out.write('<!DOCTYPE html5><html><head><meta charset="utf-8"/>'+
				'<title>Viewing '+path+'</title></head><body><table><th><td>'+
				'file</td><td>mime</td></th><tr><td><a href="../">Parent '+
				'Directory</a></td></tr>');
			for (var i = files.length - 1; i >= 0; i--) {
				var fsnode = dir+files[i];
				//	the first sin of node.js -- I know..
				stats = fs.statSync(dir+files[i]);
				if(err!==null)return console.log(err);
				var bs = path.basename(files[i]);
				console.log(fsnode);
				if(stats.isDirectory()) bs += '/';
				out.write('<tr><td><a href="'+bs+'">'+bs+'</a></td>');
				if(stats.isDirectory()) {
					out.write('<td> [Directory Entry] </td></tr>');
				} else {
					out.write('<td>'+getMime(files[i])+'</td></tr>');
				}
			}
			out.end('</table></body></html>');
		} else {
			out.writeHead(500);
			out.end('Uh, oh! Something bad happend, sorry! ;-C');
		}
	}