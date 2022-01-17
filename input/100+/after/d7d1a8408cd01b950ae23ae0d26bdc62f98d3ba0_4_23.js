function($, test){
				var $x = $('<div><p>1</p><p>2</p><p>3</p></div>').children();
				var event = 'myEvent';
				var tic = $x.wait(event);
				test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
				test.assertEquals("tic should stay on all elements", 3, $(tic).size());
				$x.eq(1).trigger(event);
				test.assertEquals("tic should now stay on triggered element", '2', $(tic).text());
				var $y = tic.then();
				test.assertEquals("after event only matched element can go on", '2', $y.text());
				test.done();
			}