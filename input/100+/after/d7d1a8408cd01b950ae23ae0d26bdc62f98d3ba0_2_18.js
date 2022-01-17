function(){
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
					}