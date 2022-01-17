function(results){
				var repo = results.data;

				var date = new Date(repo.pushed_at);
				var pushed_at = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
				
				var $widget = $(' \
					<div class="github-box repo">  \
					    <div class="github-box-title"> \
					        <h3> \
					            <a class="owner" href="' + repo.owner.url.replace('api.','').replace('users/','') + '">' + repo.owner.login  + '</a> \
					            /  \
					            <a class="repo" href="' + repo.url.replace('api.','').replace('repos/','') + '">' + repo.name + '</a> \
					        </h3> \
					        <div class="github-stats"> \
					            <a class="watchers" href="' + repo.url.replace('api.','').replace('repos/','') + '/watchers">' + repo.watchers + '</a> \
					            <a class="forks" href="' + repo.url.replace('api.','').replace('repos/','') + '/forks">' + repo.forks + '</a> \
					        </div> \
					    </div> \
					    <div class="github-box-content"> \
					        <p class="description">' + repo.description + ' &mdash; <a href="' + repo.url.replace('api.','').replace('repos/','') + '#readme">Read More</a></p> \
					        <p class="link"><a href="' + repo.homepage + '">' + repo.homepage + '</a></p> \
					    </div> \
					    <div class="github-box-download"> \
					        <p class="updated">Latest commit to the <strong>master</strong> branch on ' + pushed_at + '</p> \
					        <a class="download" href="' + repo.url.replace('api.','').replace('repos/','') + '/zipball/master">Download as zip</a> \
					    </div> \
					</div> \
				');

				$widget.appendTo($container);
			}