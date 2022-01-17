function(err, count){
			// console.log("Success Count:",count,' autoLimit:', autoLimit, ' cCapacity:', cCapacity);
			// -------------------Rule NO.1-----------------------------------
			// 如果当前报名成功的会员数目小于允许的自动审核限额则自动审核通过
			if( count < autoLimit ){
				console.info('[INFO]----Auto approved according to rule NO.1: dancerID-', dancerModel.dancerID, 
					', DancerName-', dancerModel.dancerName, ', Course-', courseVal);
				self.updateDancerCourseStatus(dancerModel.dancerID, courseVal, 'approved', function(){

					self.findDancerEmailByID(dancerModel.dancerID, function(err, dancer){
				    	if (err) throw err;
				    	sendMail(dancer.email, '您的报名申请已自动审核通过', self.cCourse.successMsg + '课程代码：' + courseVal);
				    });

				});
				// 每条自动审核规则执行完后都要return，否则会继续执行下面的规则，下同。
				return;
			}
			
			// 如果当前报名成功的会员数目小于课程总容量则继续下面的审核规则，否则不再继续审核
			if( count <= cCapacity ){

				self.findDancerByID(dancerModel.dancerID, function(err, result){
					if (err) {throw err};

					// -------------------Rule NO.2-----------------------------------
					// 如果该舞种报名男士优先则直接审核通过
					if ( !!result && result.gender === 'male' && manFirst ) {
						console.info('[INFO]----Auto approved according to rule NO.2: dancerID-', dancerModel.dancerID, 
							', DancerName-', dancerModel.dancerName, ', Course-', courseVal);

						self.updateDancerCourseStatus(dancerModel.dancerID, courseVal, 'approved', function(){

						    sendMail(result.email, '您的报名申请已自动审核通过', self.cCourse.successMsg + '课程代码：' + courseVal);

						});

						return;
					};

					// -------------------Rule NO.3-----------------------------------
					if ( !!result && ( result.level >= 3 || result.vip >= 2 || result.forever ) ) {

						console.info('[INFO]----Auto approved according to rule NO.3: dancerID-', dancerModel.dancerID, 
							', DancerName-', dancerModel.dancerName, ', Course-', courseVal);

						self.updateDancerCourseStatus(dancerModel.dancerID, courseVal, 'approved', function(){

						    sendMail(result.email, '您的报名申请已自动审核通过', self.cCourse.successMsg + '课程代码：' + courseVal);

						});

						return;
					};

				})

			} // end if count < cCapacity
			return;
		}