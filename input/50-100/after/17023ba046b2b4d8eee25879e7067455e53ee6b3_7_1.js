function(){var t=this
return function(o){var s=this,a=sl(arguments),r
if(typeof o=="object")for(r in o){a[0]=r
a[1]=o[r]
r=t.apply(s,a)}else r=t.apply(s,a)
return r}}