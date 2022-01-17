function(ms){var t=this,s,args
return function(){clearTimeout(s)
args=arguments
s=setTimeout(function(){t.apply(null,args)},ms)}}