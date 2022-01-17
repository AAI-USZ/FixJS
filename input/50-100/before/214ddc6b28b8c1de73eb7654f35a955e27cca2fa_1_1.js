function(v){
							v.authorid = v.author;
							v.authorface =v.face;
							v.id = v._id.toString();
							v.authorname = v.authorname;
							v.imgs = [v.url];
							v.createtime = stool.fdate('y-m-d h:m:s', v.timestamp);
							v.commetnum = v.commet||0;
							v.lovenum = v.love||0;
						}