function( tab, projectName, width, height ) {

			var panel, project,
				self = this;

			project = new PixelCanvas({
				name : projectName,
				width : width,
				height : height
			});

			tab.content.empty();
			tab.content.append( project.el );

			tab.title.html( projectName );

			self._projects.push({
				tab : tab,
				project : project
			});

			self.publish( 'project:new' , [project] );
			self.publish( 'project:active', [project] );

			console.log(projectName, width, height);
		}