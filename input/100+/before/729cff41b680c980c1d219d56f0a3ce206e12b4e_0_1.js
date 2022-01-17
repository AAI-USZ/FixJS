function() {
var ifile, ifd, sz, recsz, buff, lrecsz, lbuff;

try {
	ifile = path.join(geodatadir, 'geoip-city-names.dat');
	ifd = fs.openSync(ifile, "r");
	sz = fs.fstatSync(ifd).size;
	lrecsz = 32;

	lbuff = new Buffer(sz);
	fs.readSync(ifd, lbuff, 0, sz, 0);
	fs.closeSync(ifd);

	ifile = path.join(geodatadir, 'geoip-city.dat');
	ifd = fs.openSync(ifile, "r");
	sz = fs.fstatSync(ifd).size;
	recsz = 12;
}
catch(err) {
	if(err.code != 'ENOENT' && err.code != 'EBADF') {
		throw err;
	}
	console.warn("\n======================== Warning ========================");
	console.warn(" City data not found, falling back to country data.");
	console.warn(" Get the latest city data files from\n");
	console.warn(" https://github.com/bluesmoon/node-geoip/tree/master/data\n");
	console.warn(" You need geoip-city-names.dat and geoip-city.dat");
	console.warn(" Put them into the data/ directory for this package");
	console.warn("======================== Warning ========================\n\n");
	ifile = path.join(geodatadir, 'geoip-country.dat');
	ifd = fs.openSync(ifile, "r");
	sz = fs.fstatSync(ifd).size;
	recsz = 10;
}

buff = new Buffer(sz);
fs.readSync(ifd, buff, 0, sz, 0);
fs.closeSync(ifd);

var lastline = sz/recsz-1;
var lastip = buff.readUInt32BE(lastline*recsz+4);
var firstip = buff.readUInt32BE(0);

var private_ranges = [
		[aton4("10.0.0.0"), aton4("10.255.255.255")],
		[aton4("172.16.0.0"), aton4("172.31.255.255")],
		[aton4("192.168.0.0"), aton4("192.168.255.255")]
	];

lookup4 = function(ip) {
	var fline=0, floor=lastip, cline=lastline, ceil=firstip, line, locId, cc, rg, city, lat, lon, i;

	// outside IPv4 range
	if(ip > lastip || ip < firstip) {
		return null;
	}
	
	// private IP
	for(i=0; i<private_ranges.length; i++) {
		if(ip >= private_ranges[i][0] && ip <= private_ranges[i][1]) {
			return null;
		}
	}

	do {
		line = Math.round((cline-fline)/2)+fline;
		floor = buff.readUInt32BE(line*recsz);
		ceil  = buff.readUInt32BE(line*recsz+4);

		if(floor <= ip && ceil >= ip) {
			if(recsz == 10) {
				cc = buff.toString('utf8', line*recsz+8, line*recsz+10);
				rg = city = "";
				lat = lon = 0;
			}
			else {
				locId = buff.readUInt32BE(line*recsz+8)-1;
				cc = lbuff.toString('utf8', locId*lrecsz+0, locId*lrecsz+2).replace(/\u0000.*/, '');
				rg = lbuff.toString('utf8', locId*lrecsz+2, locId*lrecsz+4).replace(/\u0000.*/, '');
				lat = lbuff.readInt32BE(locId*lrecsz+4)/10000;
				lon = lbuff.readInt32BE(locId*lrecsz+8)/10000;
				city = lbuff.toString('utf8', locId*lrecsz+12, locId*lrecsz+lrecsz).replace(/\u0000.*/, '');
			}

			return {
				range: [floor, ceil],
				country: cc,
				region: rg,
				city: city,
				ll: [ lat, lon ]
			};
		}
		else if(fline == cline) {
			return null;
		}
		else if(fline == cline-1) {
			if(line == fline)
				fline = cline;
			else
				cline = fline;
		}
		else if(floor > ip) {
			cline = line;
		}
		else if(ceil < ip) {
			fline = line;
		}
	} while(1);
}

}