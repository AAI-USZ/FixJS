function(a){var b=t("^["+a.source+"\\s]+$"),c=t("["+a.source+"]");a.ca.forEach(function(d){ha(v.prototype,"is"+d,function(){return b.test(this.trim())});ha(v.prototype,"has"+d,function(){return c.test(this)})})}