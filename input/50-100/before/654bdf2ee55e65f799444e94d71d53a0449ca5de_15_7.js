function (model) {
                var project = new Project(model.Project);
                log('HACK: injected projects/ into project id value');
                project.set('Id', 'projects/' + id);
                var projectLayoutView = new ProjectLayoutView({ model: project });
                app.showFormContentView(projectLayoutView, 'projects');
                if (app.isPrerendering('projects')) {
                    projectLayoutView.showBootstrappedDetails();
                }
                projectLayoutView.showStream();
                app.setPrerenderComplete();
            }