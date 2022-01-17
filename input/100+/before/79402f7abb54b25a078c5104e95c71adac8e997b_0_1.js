function CssCombo(cfg, success){
    var self = this;

    self.imports = [];

    utils.debug = cfg.debug;
    if(!cfg.target) {
        utils.log('please enter css path\r\n', 'error');
        return false;
    }

    if(!cfg.outputEncoding || cfg.outputEncoding == 'gbk' || cfg.outputEncoding == 'GBK' || cfg.outputEncoding == 'gb2312') {
        cfg.outputEncoding = '';
    }

//    if(typeof cfg.exclude == 'undefined'){
//        cfg.exclude = [/.combo.css/, /-min.css/, /.combine.css/];
//    }

    cfg.compress = !!cfg.compress;

    cfg.output = path.resolve(path.normalize(cfg.output));

    self.config = cfg;
    self.build(success);
    return true;
}