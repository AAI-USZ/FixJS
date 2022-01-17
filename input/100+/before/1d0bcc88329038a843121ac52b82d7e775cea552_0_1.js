function(mycomment) {
		var IDre = /\/r\/[\w]+\/comments\/([\w]+)\//i;
		var matches = IDre.exec(location.href);
		if (matches) {
			if (!this.currentCommentCount) {
				this.currentCommentID = matches[1];
				var thisCount = document.querySelector('#siteTable a.comments');
				if (thisCount) {
					var split = thisCount.innerHTML.split(' ');
					this.currentCommentCount = split[0];
					if ((typeof(this.commentCounts[this.currentCommentID]) != 'undefined') && (this.commentCounts[this.currentCommentID] != null)) {
						var prevCommentCount = this.commentCounts[this.currentCommentID].count;
						var diff = this.currentCommentCount - prevCommentCount;
						if (diff>0) thisCount.innerHTML = this.currentCommentCount + ' comments ('+diff+' new)';
					}
					if (isNaN(this.currentCommentCount)) this.currentCommentCount = 0;
					if (mycomment) this.currentCommentCount++;
				}
			} else {
				this.currentCommentCount++;
			}
		}
		var now = new Date();
		if (typeof(this.commentCounts) == 'undefined') {
			this.commentCounts = {};
		}
		if (typeof(this.commentCounts[this.currentCommentID]) == 'undefined') {
			this.commentCounts[this.currentCommentID] = {};
		}
		this.commentCounts[this.currentCommentID].count = this.currentCommentCount;
		this.commentCounts[this.currentCommentID].url = location.href.replace(location.hash, '');
		this.commentCounts[this.currentCommentID].title = document.title;
		this.commentCounts[this.currentCommentID].updateTime = now.getTime();
		// if (this.currentCommentCount) {
		// dumb, but because of Greasemonkey security restrictions we need a window.setTimeout here...
		window.setTimeout( function() {
			RESStorage.setItem('RESmodules.newCommentCount.counts', JSON.stringify(modules['newCommentCount'].commentCounts));
		}, 100);
		// }
	}