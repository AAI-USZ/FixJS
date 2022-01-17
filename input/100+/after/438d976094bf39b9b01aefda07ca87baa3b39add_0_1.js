function(namespace, properties, extendclass){
			var xt = extendclass, path = namespace, obj = properties , cl , spy ;
			if(regNS.test(path)) return ks(path.replace(regNS, '.'), obj, xt) ;
			var sp = path.split('.') ;
			var l = sp.length, p = ns, ch ;
			for(var i = 0 ; i < l ; i++)
				ch = sp[i], (i < l - 1) && (p = (!!p[ch] ? p[ch] : (p[ch] = {name:ch}))) ;
			cl = p[ch] ;
			if(obj !== undefined) cl = undefined ;
			else return p[ch] ;p
			return cl || (function(){
				var kl = function(){return (no_ctor)? this : '__init__' in this ? this['__init__'].apply(this, arguments) : this } ;
				kl.$ns = path.replace(/((.*)[.])*([^.]+)$/i, function($0, $1, $2, $3){return kl.$pkg = $2, kl.$classname = $3, $0 }) ;
				kl.toString = function(){ return '[object ' + path + ']' } ;
				if(!!xt) {
					spy = xt.prototype, kl.$super = xt;
					kl.prototype = (function(el) { return no_ctor = true, el = new xt, no_ctor = false, el })() ;
					for(var i in xt) if(!!!kl[i] && !(i in keep)) kl[i] = xt[i] ;
				}
				kl.prototype.constructor = kl.prototype.$class = kl ;
				if('__classvars__' in obj){
					for(var i in obj['__classvars__']) kl[i] = obj['__classvars__'][i] ;
					delete obj['__classvars__'] ;
				}
				kl.prototype.toString = function(){	return '[object ' +  path + ']' }
				for(var s in obj)
					kl.prototype[s] =
						(!!xt && typeof obj[s] == 'function') ?
						(function(meth, name, nn, old_super) {return function() {return (old_super = this.$super, this.$super = spy[name] , nn = meth.apply(this, arguments), this.$super = old_super , nn)}})(obj[s], s) 
						: obj[s] ;
				('__static__' in kl) && kl.__static__.apply(kl) ;
				return (p[ch] = kl) ;
			})() ;
		}