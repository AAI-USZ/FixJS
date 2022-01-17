function copySync(src, dst) {
 
  if(typeof dst == 'undefined') {

		throw new Error('Destination is not defined');
  } 

  if(!path.existsSync(src)) {

    throw new Error(src + ' does not exists.');
  }

  if(fs.statSync(src).isDirectory()) {

    throw new Error(src + ' is a directory. It must be a file');
  }

  if(src == dst) {

    throw new Error(src + ' and ' + dst + 'are identical');
  }

  var infd = fs.openSync(src, 'r');
  var size = fs.fstatSync(infd).size;
  var outfd = fs.openSync(dst, 'w');


  fs.sendfileSync(outfd, infd, 0, size);

  fs.close(infd);
  fs.close(outfd);
}