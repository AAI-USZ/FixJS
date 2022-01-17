function checkssha(passwd, hash, next) {
    if (hash.substr(0,6) != '{SSHA}') {
        return false;
    }
    var bhash = new Buffer(hash.substr(6),'base64');
    var salt = bhash.toString('binary',20); // sha1 digests are 20 bytes long
    ssha_pass(passwd,salt,function(err,newssha){
        if(err) return next(err)
        return next(null,hash === newssha)
    });
    return null;
}