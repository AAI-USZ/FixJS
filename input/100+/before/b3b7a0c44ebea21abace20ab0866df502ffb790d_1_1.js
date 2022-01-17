function ($rows) {
        if (!this.$batchDetail)
            this.$batchDetail = $(tmp_detail_batch);
        var base = this;
        var ids = [$rows.length];
        var isCompleted, priority;
        $rows.each(function (i, n) {
            var id = base.getTaskId($(n));
            ids[i] = id;
            var task = cached_tasks[id];
            if (i == 0) {
                isCompleted = task.isCompleted();
                priority = task.priority();
                return;
            }
            if (isCompleted != task.isCompleted()) { isCompleted = null }
            if (priority != task.priority()) { priority = null }
        });
        //批量id设置
        this.$batchDetail.attr('id', ids.join(','));
        //批量标题
        this.$batchDetail.find('#subject').html($rows.length + lang.batch_task);
        //批量是否完成
        if (isCompleted != null)
            this.$batchDetail.find('#isCompleted')
            [isCompleted ? 'addClass' : 'removeClass']('active')
            [isCompleted ? 'addClass' : 'removeClass']('btn-success');
        else
            this.$batchDetail.find('#isCompleted').removeClass('active').removeClass('btn-success');
        //批量优先级
        if (priority != null)
            this.$batchDetail.find('#priority button')
                .removeClass('active')
                .eq(parseInt(priority))
                .addClass('active');
        else
            this.$batchDetail.find('#priority button').removeClass('active');
        this.$wrapper_detail.empty().append(this.$batchDetail);
        //datepicker重复初始化问题 应先append再初始化
        this.$batchDetail.find('#dueTime').removeClass('hasDatepicker').datepicker();
    }