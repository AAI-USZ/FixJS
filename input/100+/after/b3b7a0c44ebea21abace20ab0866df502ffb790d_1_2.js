function (e) {
            var ctrl = e.ctrlKey;
            var shift = e.shiftKey;
            var $el = $(e.target);
            var $row = base.getRow($el);
            //只处理任务行
            if (!base.isTask($row)) return;
            //总是设置input焦点
            base.focusRow($row);
            var $focus = base.$focusRow = $row;
            ////////////////////////////////////////////////////////////////////////////////////////
            //row_task选中处理
            if (!$el.is('i') && !$el.is('a') && base.isTask($row)) {
                var $avtives = base.getActives();
                //多选支持
                if (!ctrl && !shift)
                    base.removeActive($avtives);
                //ctrl反选支持
                base[ctrl && base.isActive($row) ? 'removeActive' : 'setActive']($row);
                $avtives = base.getActives();
                if (shift)
                    base._batchRowActive($avtives.first(), $avtives.last());
                //此时选中情况已经变化
                $avtives = base.getActives();
                //呈现详情
                if ($avtives.length == 1)
                    base._renderDetail($focus);
                //批量详情
                else if ($avtives.length > 1)
                    base._renderBatchDetail($avtives);
                //设置是否可编辑
                base._setEditable(base.$wrapper_detail);
                return;
            }
            var task = cached_tasks[base.getTaskId($row)];
            ////////////////////////////////////////////////////////////////////////////////////////
            //是否完成
            if ($el.is('i') && $el.hasClass('icon-check')) {
                var old = task.isCompleted();
                task.setCompleted(!old);
                if (base.onCompletedChange)
                    base.onCompletedChange(task, old, !old);
                return;
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //priority选择
            if ($el.is('a') && $el.parent().is('li')) {
                var old = task.priority();
                var p = base[$el.attr('priority')];
                if (old == p) return;
                task.setPriority(p);
                debuger.assert(task.priority() == p);
                if (base.onPriorityChange)
                    base.onPriorityChange($row, task, old, p);
                return;
            }
        }