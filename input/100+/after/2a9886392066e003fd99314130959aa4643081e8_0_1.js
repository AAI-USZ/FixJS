function (appdir) {
  // 切换工作目录
  utils.chdir(appdir);
  
  var appdir = process.cwd();
  utils.log('Scan app dir "' + appdir + '"...');
  
  // 读取html目录和code目录的文件结构
  var phtml = path.resolve(appdir, 'html');
  var shtml = tool.listdir(phtml);
  
  // 检查是否存在html目录
  if (!fs.existsSync('html'))
    utils.die('Cannot find html dir!');
    
  // 创建目录gzip目录
  utils.mkdir('html/.gzip');
  var gzipdir = path.resolve('html/.gzip');
  
  // 去除.gzip目录下的文件
  var list = [];
  for (var i in shtml.file) {
    if (tool.relativePath(gzipdir, shtml.file[i]) === null)
      list.push(shtml.file[i]);
  }
  utils.log('Find ' + list.length + ' file(s)');
  
  // 压缩文件
  var compressFile = function () {
    var f = list.pop();
    // 如果列表已空，则退出程序
    if (!f) {
      utils.exit('OK.');
    }
    // 忽略图片文件
    else if (IMAGE_FILE.indexOf(path.extname(f)) !== -1) {
      utils.log('Ignore image file: ' + f);
      compressFile();
    }
    else {
      utils.log('Compress file "' + f + '"...');
      var filename = f.substr(phtml.length + 1);
      var basedir = path.dirname(path.resolve(gzipdir, filename));
      mkdirp(basedir, 777, function (err) {
        zlib.gzip(fs.readFileSync(f), function (err, data) {
          if (err)
            utils.log('Error: ' + err.stack);
          else {
            var sf = path.resolve(gzipdir, filename);
            fs.writeFileSync(sf, data);
            utils.log('Save as "' + sf + '"');
          }
          compressFile();
        });
      });
    }
  }
  // 开始
  compressFile();
  
  return 0;
}