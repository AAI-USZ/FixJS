function(){
				var res = steal.build.js.makePackage(
				[
					{
						buildType : "js",
						rootSrc : "a.js",
						text: "a"
					},
					{
						buildType : "js",
						rootSrc : "b.js",
						text: "b"
					},
					{
						buildType : "css",
						rootSrc : "c.css",
						text: "c"
					}
				],
				{
					"package/1.js" : ["jquery/jquery.js"]
				},
				"package/css.css")
				
				s.test.equals(
					res.js,
					"steal.has('a.js','b.js');\n"+
					"steal({src: 'package/1.js', waits: true, has: ['jquery/jquery.js']});\n"+
					"steal({src: 'package/css.css', waits: true, has: ['c.css']});\n"+
					"a;\n"+
					"steal.executed('a.js');\n"+
					"b;\n"+
					"steal.executed('b.js')\n",
					"js works");
					
				s.test.equals(res.css,"c")
				
				s.test.clear();
			}