function DSN(code, msg, def, subject, detail) {
    this.code = (/^[245]\d{2}/.exec(code)) ? code : null || def || 450;
    this.msg = msg;
    this.cls = parseInt(new String(this.code)[0]);
    this.sub = (enum_status_codes[subject]) ? subject : 0;
    this.det = (enum_status_codes[this.sub][detail]) ? detail : 0;
    this.default_msg = enum_status_codes[this.sub][this.det];
    // Handle multi-line replies
    if (Array.isArray(this.msg)) {
        this.reply = [];
        var m;
        while (m = this.msg.shift()) {
            this.reply.push([this.cls, this.sub, this.det].join('.') + ' ' + m);
        }
    } else {
        this.reply = [this.cls, this.sub, this.det].join('.') + ' ' + (this.msg || this.default_msg);
    }
}