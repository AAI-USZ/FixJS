function($, test){
				var $x = $('<div><p>1</p><p>2</p><p>3</p></div>');
				var timeout = 100;
				var size = 3;
				test.assertEquals("test object has too less children", size, $x.children().size());
				
				var X=$$();
				var tic = $x.children().repeat(X).eq(X).wait(timeout).until(size);
				
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				
				window.setTimeout(function(){
					test.assertEquals("tic should stay on one child", 1, $(tic).size());
					test.assertEquals("tic should stay on first child", "1", $(tic).text());
					window.setTimeout(function(){
						test.assertEquals("tic should stay on one child", 1, $(tic).size());
						test.assertEquals("tic should stay on second child", "2", $(tic).text());
						window.setTimeout(function(){
							test.assertEquals("tic should stay on one child", 1, $(tic).size());
							test.assertEquals("tic should stay on third child", "3", $(tic).text());
							window.setTimeout(function(){
								test.assertEquals("tic should still stay on third children", "3", $(tic).text());
								var $y = tic.next();
								test.assertNotEquals("return value of instant call to .next() must be original object", tic, $y);
								test.assertEquals(".next() should return empty set after last child", 0, $y.size());
								test.done();
							}, timeout);
						}, timeout);
					}, timeout);
				}, timeout / 2);
			}