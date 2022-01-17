function(tweetA, tweetB) {
			 if (tweetA.get('creationDate') === tweetB.get('creationDate'))
				 //in the 'weird' case, let's use ID
				 {
				   if (tweetA.get('id') > tweetB.get('id')) return -1;
				   if (tweetA.get('id') < tweetB.get('id')) return 1;
				   if (tweetA.get('id') === tweetB.get('id')) 
					   {
					   console.log("Strange, tweets with same ID added!!");
					   return 0;
					   }
				   
				 }
			 if (tweetA.get('creationDate') > tweetB.get('creationDate')) return -1;
			 if (tweetA.get('creationDate') < tweetB.get('creationDate')) return 1;
		}