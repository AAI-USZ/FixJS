function () {
        if (!this.$el_detail)
            this.$el_detail = this._generateDetail(this['data']);
        //datepicker重复初始化问题
        this.$el_detail.find('#dueTime').removeClass('hasDatepicker');
        this.$el_detail.find('#dueTime').datepicker();
        //设置值
        this.setDetail_Completed(this.isCompleted());
        this.setDetail_Subject(this.subject());
        this.setDetail_Priority(this.priority());
        this.setDetail_DueTime(this.dueTime());
        this.setDetail_Body(this.get('body'));
        return this.$el_detail;
    }