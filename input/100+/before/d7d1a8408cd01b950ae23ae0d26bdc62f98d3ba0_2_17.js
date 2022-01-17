function(){
							test.assertEquals("tic should still stay on third children", "3", $(tic).text());
							var $y = tic.next();
							test.assertNotEquals("return value of instant call to .next() must be original object", tic, $y);
							test.assertEquals(".next() should return empty set after last child", 0, $y.size());
							test.done();
						}