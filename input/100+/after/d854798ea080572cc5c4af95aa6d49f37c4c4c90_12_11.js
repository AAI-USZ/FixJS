function(a){return this.trim().each(/^.*$/gm,a)},paragraphs:function(a){var b=this.trim().split(/[\r\n]{2,}/);return b=b.map(function(c){if(a)var d=a.call(c);return d?d:c})},startsWith:function(a,b){if(M(b))b=j;var c=F(a)?a.source.replace("^",""):S(a);return t("^"+c,b?"":"i").test(this)},endsWith:function(a,b){if(M(b))b=j;var c=F(a)?a.source.replace("$",""):S(a);return t(c+"$",b?"":"i").test(this)},isBlank:function(){return this.trim().length===0},has:function(a){return this.search(F(a)?
a:S(a))!==-1},add:function(a,b){b=M(b)?this.length:b;return this.slice(0,b)+a+this.slice(b)},remove:function(a){return this.replace(a,"")},hankaku:function(){return Lb(this,arguments,Ib,Gb)},zenkaku:function(){return Lb(this,arguments,Hb,Fb)},hiragana:function(a){var b=this;if(a!==m)b=b.zenkaku("k");return b.replace(/[\u30A1-\u30F6]/g,function(c){return c.shift(-96)})},katakana:function(){return this.replace(/[\u3041-\u3096]/g,function(a){return a.shift(96)})},reverse:function(){return this.split("").reverse().join("")}