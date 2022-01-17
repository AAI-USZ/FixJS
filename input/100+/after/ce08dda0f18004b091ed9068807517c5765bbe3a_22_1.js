function (controlFile) {
        var data = cc.SAXParser.shareParser().getList(controlFile);
        cc.Assert(data, "cc.BMFontConfiguration._parseConfigFile | Open file error.");

        // parse spacing / padding
        var line, re;

        re = /padding+[a-z0-9\-= ",]+/gi;
        line = re.exec(data)[0];
        if (line) {
            this._parseInfoArguments(line);
        }

        re = /common lineHeight+[a-z0-9\-= ",]+/gi;
        line = re.exec(data)[0];
        if (line) {
            this._parseCommonArguments(line);
        }

        re = /page id=[a-zA-Z0-9\.\-= ",]+/gi;
        line = re.exec(data)[0];
        if (line) {
            this._parseImageFileName(line, controlFile);
        }

        re = /chars c+[a-z0-9\-= ",]+/gi;
        line = re.exec(data)[0];
        if (line) {
            // Ignore this line
        }

        re = /char id=\w[a-z0-9\-= ]+/gi;
        line = data.match(re);
        if (line) {
            // Parse the current line and create a new CharDef
            for (var i = 0; i < line.length; i++) {
                var element = new cc._FontDefHashElement();
                this._parseCharacterDefinition(line[i], element.fontDef);
                element.key = element.fontDef.charID;
                this.fontDefDictionary[element.key] = element;
            }
        }

        re = /kernings count+[a-z0-9\-= ",]+/gi;
        if (re.test(data)) {
            line = RegExp.$1[0];
        }
        if (line) {
            this._parseKerningCapacity(line);
        }

        re = /first=\w[a-z0-9\-= ]+/gi;
        line = data.match(re);
        if (line) {
            for (var i = 0; i < line.length; i++) {
                this._parseKerningEntry(line[i]);
            }
        }
    }