function($, test){
				var $x = $('<div><p>1</p><p>2</p><p>3</p></div>').children(':first');
				var tic = $x.wait().next();
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				var $t = $(tic);
				test.assertEquals("tic should currently hold one element", 1, $t.size());
				test.assertEquals("tic should currently stay on first child", "1", $t.text());
				window.setTimeout(function(){
					test.assertEquals("after wait tic should stay on second child", "2", $(tic).text());
					var $y = tic.next();
					test.assertEquals("after second next tic should stay on third child", "3", $(tic).text());
					test.assertNotEquals("instant call to .next() should return original object instead of tic", tic, $y);
					test.done();
				}, 1);
			}