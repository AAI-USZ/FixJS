function(thisAuthorObj) {
		var userObject = [];
		// var thisAuthorObj = this.authors[authorNum];
		if ((thisAuthorObj) && (!(hasClass(thisAuthorObj,'userTagged'))) && (typeof(thisAuthorObj) != 'undefined') && (thisAuthorObj != null)) {
			if (this.options.hoverInfo.value) {
				// add event listener to hover, so we can grab user data on hover...
				thisAuthorObj.addEventListener('mouseover', function(e) {
					modules['userTagger'].showTimer = setTimeout(function() {
						modules['userTagger'].showAuthorInfo(thisAuthorObj);
					}, modules['userTagger'].options.hoverDelay.value);
				}, false);
				thisAuthorObj.addEventListener('mouseout', function(e) {
					clearTimeout(modules['userTagger'].showTimer);
				}, false);
			}
			var thisAuthor = thisAuthorObj.text;
			var noTag = false;
			if (thisAuthor.substr(0,3) == '/u/') {
				noTag = true;
				thisAuthor = thisAuthor.substr(3);
			}
			if (!noTag) {
				addClass(thisAuthorObj, 'userTagged');
				if (typeof(userObject[thisAuthor]) == 'undefined') {
					var thisVotes = 0;
					var thisTag = null;
					var thisColor = null;
					var thisIgnore = null;
					if ((this.tags != null) && (typeof(this.tags[thisAuthor]) != 'undefined')) {
						if (typeof(this.tags[thisAuthor].votes) != 'undefined') {
							thisVotes = parseInt(this.tags[thisAuthor].votes);
						}
						if (typeof(this.tags[thisAuthor].tag) != 'undefined') {
							thisTag = this.tags[thisAuthor].tag;
						}
						if (typeof(this.tags[thisAuthor].color) != 'undefined') {
							thisColor = this.tags[thisAuthor].color;
						}
						if (typeof(this.tags[thisAuthor].ignore) != 'undefined') {
							thisIgnore = this.tags[thisAuthor].ignore;
						}
					}
					userObject[thisAuthor] = {
						tag: thisTag,
						color: thisColor,
						ignore: thisIgnore,
						votes: thisVotes
					}
				}
				
				var userTagFrag = document.createDocumentFragment();
				
				var userTagLink = document.createElement('a');
				if (!(thisTag)) {
					thisTag = '<div class="RESUserTagImage"></div>';
					userTagLink.setAttribute('class','userTagLink');
				} else {
					userTagLink.setAttribute('class','userTagLink hasTag');
				}
				userTagLink.innerHTML = thisTag;
				if (thisColor) {
					userTagLink.setAttribute('style','background-color: '+thisColor+'; color: '+this.bgToTextColorMap[thisColor]);
				}
				userTagLink.setAttribute('username',thisAuthor);
				userTagLink.setAttribute('title','set a tag');
				userTagLink.setAttribute('href','javascript:void(0)');
				userTagLink.addEventListener('click', function(e) {
					modules['userTagger'].openUserTagPrompt(e.target, this.getAttribute('username'));
				}, true);
				var userTag = document.createElement('span');
				// var lp = document.createTextNode(' (');
				// var rp = document.createTextNode(')');
				userTag.appendChild(userTagLink);
				// userTagFrag.appendChild(lp);
				userTagFrag.appendChild(userTag);
				// userTagFrag.appendChild(rp);
				if (this.options.colorUser.value) {
					var userVoteFrag = document.createDocumentFragment();
					var spacer = document.createTextNode(' ');
					userVoteFrag.appendChild(spacer);
					var userVoteWeight = document.createElement('a');
					userVoteWeight.setAttribute('href','javascript:void(0)');
					userVoteWeight.setAttribute('class','voteWeight');
					userVoteWeight.innerHTML = '[vw]';
					userVoteWeight.addEventListener('click', function(e) {
						var theTag = this.parentNode.querySelector('.userTagLink');
						modules['userTagger'].openUserTagPrompt(theTag, theTag.getAttribute('username'));
					}, true);
					this.colorUser(userVoteWeight, thisAuthor, userObject[thisAuthor].votes);
					userVoteFrag.appendChild(userVoteWeight);
					userTagFrag.appendChild(userVoteFrag);
				}
				insertAfter( thisAuthorObj, userTagFrag );
				// thisAuthorObj.innerHTML += userTagFrag.innerHTML;
				thisIgnore = userObject[thisAuthor].ignore;
				if (thisIgnore && (RESUtils.pageType('profile') != true)) {
					if (this.options.hardIgnore.value) {
						if (RESUtils.pageType() == 'comments') {
							/*
							var thisComment = thisAuthorObj.parentNode.parentNode;
							// hide comment block first...
							thisComment.style.display = 'none';
							// hide associated voting block...
							if (thisComment.previousSibling) {
								thisComment.previousSibling.style.display = 'none';
							}
							*/
							var thisComment = thisAuthorObj.parentNode.parentNode.querySelector('.usertext');
							if (thisComment) {
								thisComment.innerHTML = thisAuthor + ' is an ignored user';
								addClass(thisComment, 'ignoredUserComment');
							}
							$(thisComment).parent().find('a.expand').click();
						} else {
							var thisPost = thisAuthorObj.parentNode.parentNode.parentNode;
							// hide post block first...
							thisPost.style.display = 'none';
							// hide associated voting block...
							if (thisPost.previousSibling) {
								thisPost.previousSibling.style.display = 'none';
							}
						}
					} else {
						if (RESUtils.pageType() == 'comments') {
							var thisComment = thisAuthorObj.parentNode.parentNode.querySelector('.usertext');
							if (thisComment) {
								thisComment.innerHTML = thisAuthor + ' is an ignored user';
								addClass(thisComment, 'ignoredUserComment');
							}
						} else {
							var thisPost = thisAuthorObj.parentNode.parentNode.parentNode.querySelector('p.title');
							if (thisPost) {
								// need this setTimeout, potentially because destroying the innerHTML causes conflict with other modules?
								setTimeout(function() {
									thisPost.innerHTML = thisAuthor + ' is an ignored user';
								}, 100);
								thisPost.setAttribute('class','ignoredUserPost');
							}
						}
					}
				}				
			}
		}
	}