function(callback){
    var _data = {};

    // Öntanımlı ayar dosyası kontrol ediliyor.
    if (fs.existsSync(this.settingDir + '/default.js'))
    {
        delete require.cache[this.settingDir + '/default.js'];
        _data = require(this.settingDir + '/default.js');
    }

    // Ortama göre ayar dosyası kontrol ediliyor.
    if (fs.existsSync(this.settingDir + '/' + this.env + '.js'))
    {
        delete require.cache[this.settingDir + '/' + this.env + '.js'];
        _data = derbyUtil.extendObject(_data, require(this.settingDir + '/' + this.env));
    }

    this.data = _data;

    callback();
}