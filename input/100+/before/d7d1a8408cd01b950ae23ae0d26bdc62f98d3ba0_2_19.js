function($, test){
			var $x = $('<div><p>1</p><p>2</p><p>3</p></div>').children();
			var event = 'myEvent';
			var $y;
			var tic = $x.repeat(event).then(function(){$y=this}).until(2);
			test.assertNotEquals("waiting tic is not the same as original object", $x, tic);
			test.assertEquals("tic should stay on all elements", 3, $(tic).size());
			$x.eq(2).trigger(event);
			test.assertEquals("tic should have visited triggered element only", '3', $y.text());
			$x.eq(1).trigger(event);
			test.assertEquals("tic should have visited triggered element only", '2', $y.text());
			$x.eq(0).trigger(event);
			test.assertEquals("tic should not use the event after the loop", '2', $y.text());
			test.assertEquals("tic should stay on last triggered element", '2', $(tic).text());
			var $y = tic.then();
			test.assertEquals("after event only matched element can go on", '2', $y.text());
			test.done();
		}