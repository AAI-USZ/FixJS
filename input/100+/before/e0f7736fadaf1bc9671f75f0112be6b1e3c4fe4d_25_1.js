function(a){a?b.attr(this,"novalidate","novalidate"):b(this).removeAttr("novalidate")},get:function(){return null!=b.attr(this,"novalidate")}}});c.addReady(function(a,c){var d;b("form",a).add(c.filter("form")).bind("invalid",b.noop);try{if(a==m&&!("form"in(m.activeElement||{})))(d=b("input[autofocus], select[autofocus], textarea[autofocus]",a).eq(0).getShadowFocusElement()[0])&&d.offsetHeight&&d.offsetWidth&&d.focus()}catch(g){