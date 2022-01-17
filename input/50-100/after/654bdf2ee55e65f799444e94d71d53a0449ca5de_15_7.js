function (model) {
                var project = new Project(model.Project);
                var projectLayoutView = new ProjectLayoutView({ model: project });
                //app.showFormContentView(projectLayoutView, 'projects');
                app.content[app.getShowViewMethodName('projects')](projectLayoutView);
                if (app.isPrerendering('projects')) {
                    projectLayoutView.showBootstrappedDetails();
                }
                projectLayoutView.showStream();
                app.setPrerenderComplete();
            }