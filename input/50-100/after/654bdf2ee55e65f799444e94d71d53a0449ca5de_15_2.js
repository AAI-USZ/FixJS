function (resp) {
            var activities = null;
            if (this.groupOrUser) {
                activities = resp.Model;
            } else {
                activities = resp.Model.Activities;
            }
            this.page = activities.Page;
            this.pageSize = activities.PageSize;
            this.total = activities.TotalResultCount;
            return activities.PagedListItems;
        }