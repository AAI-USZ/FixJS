function(data) {
            Greenmine.Filters.tagCollection.reset(data.filter_dict.tags);
            Greenmine.Filters.statusCollection.reset(data.filter_dict.status);
            Greenmine.Filters.assignedToCollection.reset(data.filter_dict.assigned_to);
            Greenmine.Filters.severityCollection.reset(data.filter_dict.severity);
            Greenmine.milestoneCollection.reset(data.filter_dict.milestones);
            Greenmine.taskCollection.reset(data.tasks);
        }