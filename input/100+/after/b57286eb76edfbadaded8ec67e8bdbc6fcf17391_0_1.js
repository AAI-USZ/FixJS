function () {
	"use strict";
	
/*
struct posix_header {             // byte offset
	char name[100];               //   0
	char mode[8];                 // 100
	char uid[8];                  // 108
	char gid[8];                  // 116
	char size[12];                // 124
	char mtime[12];               // 136
	char chksum[8];               // 148
	char typeflag;                // 156
	char linkname[100];           // 157
	char magic[6];                // 257
	char version[2];              // 263
	char uname[32];               // 265
	char gname[32];               // 297
	char devmajor[8];             // 329
	char devminor[8];             // 337
	char prefix[155];             // 345
                                  // 500
};
*/

	var utils = require("./utils"),
		headerFormat;
	
	headerFormat = [
		{
			'field': 'name',
			'length': 100,
			'type': 'string'
		},
		{
			'field': 'mode',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'uid',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'gid',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'size',
			'length': 12,
			'type': 'number'
		},
		{
			'field': 'mtime',
			'length': 12,
			'type': 'number'
		},
		{
			'field': 'chksum',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'typeflag',
			'length': 1,
			'type': 'number'
		},
		{
			'field': 'linkname',
			'length': 100,
			'type': 'string'
		},
		{
			'field': 'magic',
			'length': 6,
			'type': 'string'
		},
		{
			'field': 'version',
			'length': 2,
			'type': 'string'
		},
		{
			'field': 'uname',
			'length': 32,
			'type': 'string'
		},
		{
			'field': 'gname',
			'length': 32,
			'type': 'string'
		},
		{
			'field': 'devmajor',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'devminor',
			'length': 8,
			'type': 'number'
		},
		{
			'field': 'prefix',
			'length': 155,
			'type': 'string'
		},
		{
			'field': 'padding',
			'length': 12
		}
	];

	function formatHeader(data) {
		var buffer = utils.clean(512),
			offset = 0;

		headerFormat.forEach(function (value) {
			buffer.write(data[value.field] || "", offset);
			offset += value.length;
		});
		return buffer;
	}
	
	module.exports.structure = headerFormat;
	module.exports.format = formatHeader;
}