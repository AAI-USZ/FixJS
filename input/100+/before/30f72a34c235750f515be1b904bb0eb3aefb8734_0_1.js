function(list){
			//$D.id('res3List').innerHTML=list.js.join(',');
			if(list.css.length){
				$D.id('res1line1').className='';
				var res1css='http://127.0.0.1:1337/merge/'+list.css.join().toLowerCase()+'/jx.custom.css';
				$D.id('res1css').setAttribute('href',res1css);
				$D.id('res1css').innerHTML=res1css;
			}else{
				$D.id('res1line1').className='del';
				$D.id('res1css').setAttribute('href','#');
				$D.id('res1css').innerHTML='';
			}
			if(list.js.length){
				$D.id('res1line2').className='';
				var res1js='http://127.0.0.1:1337/merge/'+list.js.join().toLowerCase()+'/jx.custom.js';
				$D.id('res1js').setAttribute('href',res1js);
				$D.id('res1js').innerHTML=res1js;
			}else{
				$D.id('res1line2').className='del';
				$D.id('res1js').setAttribute('href','#');
				$D.id('res1js').innerHTML='';
			}
			if(list.js.length+list.css.length){
				$D.id('res2line1').className='';
				var res2js='http://127.0.0.1:1337/merge/'+(list.css.length?list.css.join('.css,')+'.css':'').toLowerCase()+(list.js.length?','+list.js.join():'').toLowerCase()+'/jx.custom.js';
				$D.id('res2js').setAttribute('href',res2js);
				$D.id('res2js').innerHTML=res2js;
			}else{
				$D.id('res2line1').className='del';
				$D.id('res2js').setAttribute('href','#');
				$D.id('res2js').innerHTML='';
			}
			//packageContext.hideLink();
		// },
		// onBuildClick:function(){
			// packageContext.createLink();
		}