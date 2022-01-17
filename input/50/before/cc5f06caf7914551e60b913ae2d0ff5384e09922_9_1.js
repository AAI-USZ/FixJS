function (id) {
            var projects = this.get('Projects');
            projects.push(id);
            this.set('Projects', projects);
        }