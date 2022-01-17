function () {
        var base = this;

        ////////////////////////////////////////////////////////////////////////////////////////
        //列表区域
        //取消所有已有bind
        this.$wrapper.unbind();
        this.$wrapper.find('tr.row_task').unbind();
        this.$wrapper.find('input').unbind();
        ////////////////////////////////////////////////////////////////////////////////////////
        //hover行工具菜单显示处理
        this.$wrapper.find('tr.row_task').hover(function (e) {
            var $el = $(e.target);
            var $row = base.getRow($el);
            $row.find('td.cell_num span').hide();
            $row.find('td.cell_num i.icon-th').show();
            $row.find('td.cell_bool ul.nav').eq(0).hide();
            $row.find('td.cell_bool ul.nav').eq(1).find('i').show();
        }, function (e) {
            var $el = $(e.target);
            var $row = base.getRow($el);
            $row.find('td.cell_num span').show();
            $row.find('td.cell_num i.icon-th').hide();
            $row.find('td.cell_bool ul.nav').eq(0).show();
            $row.find('td.cell_bool ul.nav').eq(1).find('i').hide();
        });
        ////////////////////////////////////////////////////////////////////////////////////////
        this.$wrapper.find('input').keyup(function () { base.getTask(base.getRow($(this))).setSubject($(this).val()); });
        //input焦点 目前需要在特定情况下对其进行修正
        //this.$wrapper.find('input').focus(function () { debuger.debug('focus'); }); //base.$focusRow = $el.parents('tr').eq(0); });
        //this.$wrapper.find('input').blur(function () { debuger.debug('blur'); }); //base.$focusRow = null; });
        ////////////////////////////////////////////////////////////////////////////////////////
        //click以及ctrlKey+click
        this.$wrapper.click(function (e) {
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
                if ($avtives.length == 1) {
                    base._renderDetail($focus);
                    return;
                }
                //批量详情
                if ($avtives.length > 1) {
                    base._renderBatchDetail($avtives);
                    return;
                }
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
        });
        ////////////////////////////////////////////////////////////////////////////////////////
        //其他快捷键
        this.$wrapper.keydown(function (e) {//TODO:调整keydown和keyup事件，避免持续keydown导致的损耗
            //debuger.debug(e.keyCode);
            //首次shift时
            if (e.keyCode == 16) {
                base._$shiftBegin = base.$focusRow;
                return;
            }
            //首次ctrl时
            else if (e.keyCode == 17) return;

            var ctrl = e.ctrlKey;
            var shift = e.shiftKey;
            var up = e.keyCode == 38;
            var down = e.keyCode == 40;
            var enter = e.keyCode == 13;
            var backspace = e.keyCode == 8;

            //集中忽略非快捷键处理
            if (!ctrl && !shift && !up && !down && !enter && !backspace)
                return;

            var $focus = base.$focusRow;
            var $actives = base.getActives();
            //过滤不在合法区域的行
            var $actives2 = $actives.filter(function () { return base._isRowOfValidRegion($(this)); });
            ////////////////////////////////////////////////////////////////////////////////////////
            //删除backspace 
            if (backspace) {
                var txt = base.getTaskVal($focus);
                if ($actives.length <= 1 && txt != '')
                    return;
                var $p, $n;
                var ary;
                if ($actives.length > 1) {
                    $p = base._findActivePrev();
                    $n = base._findActiveNext();
                } else if (txt == '') {
                    var ary = base._findNextAndPrev($focus);
                    $p = ary[0];
                    $n = ary[1];
                }
                base.deleteTask();
                if ($p != null)
                    base._fireRowClick($p);
                else if ($n != null)
                    base._fireRowClick($n);
                return false;
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //仅当有焦点行时才有效的行为
            if ($focus == null) return;
            //新建Enter
            if (!ctrl && enter) {
                base.appendTask();
                return;
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //完成Ctrl+Enter
            if (ctrl && enter) {
                var $rows = base.modeArgs.CanSetCompleted_RowOfInValidRegion ? $actives : $actives2;
                if ($rows.length == 0) return;
                var i = cached_tasks[base.getTaskId($rows.first())].isCompleted();
                $rows.each(function () {
                    var task = cached_tasks[base.getTaskId($(this))];
                    task.setCompleted(i); //先统一修正
                    task.setCompleted(!task.isCompleted());
                });
                //批量详情处理
                if (base._isBatchDetailValid())
                    base._renderBatchDetail($rows);
                return;
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //上下切换↓
            if (!ctrl && !shift) {
                var $prev = base._findFocusPrev();
                var $next = base._findFocusNext();
                if (up && $prev)
                    base._fireRowSingleClick($prev);
                else if (down && $next)
                    base._fireRowSingleClick($next);
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //上下移动Ctrl+↓ 需处理跨空region的移动
            else if (ctrl) {
                if (!base.modeArgs.shortcuts_move) return;
                if (up) {
                    var $prev = base._findAnyPrev($actives2.first());
                    if (!$prev) return;
                    if (base.isTask($prev))
                        $actives2.insertBefore($prev);
                    else if (base._isValidRegion($prev))
                        $prev.append($actives2);
                }
                else if (down) {
                    var $next = base._findAnyNext($actives2.last());
                    if (!$next) return;
                    if (base.isTask($next))
                        $actives2.insertAfter($next);
                    else if (base._isValidRegion($next))
                        $next.prepend($actives2);
                }
                //移动过程中会丢失焦点，在此修正
                base.focusRow($focus);
                //由于顺序变更需要刷新排序等
                base._flushIdxs();
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            //批量选择Shift+↓
            else if (shift) {
                var $prev = base._findFocusPrev();
                var $next = base._findFocusNext();
                if (up && $prev)
                    base._fireRowClick($prev);
                if (down && $next)
                    base._fireRowClick($next);
                base._batchRowActive(base._$shiftBegin, base.$focusRow)
            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////
        //详情区域
        this.$wrapper_detail.unbind();
        this.$wrapper_detail.click(function (e) {
            var $el = $(e.target);
            var ids = $el.parents('.region_detail');
            if (ids.length == 0) return;
            ids = ids.eq(0).attr('id').split(',');
            //优先级 需处理批量场景
            if ($el.parent().is('#priority') || ($el.is('i') && $el.parent().parent().is('#priority'))) {
                for (var i = 0; i < ids.length; i++) {
                    var task = cached_tasks[ids[i]];
                    var old = task.priority();
                    var p = $el.attr('priority');
                    task.setPriority(p);
                    //额外逻辑
                    if (base.onPriorityChange)
                        base.onPriorityChange(task.el(), task, old, p);
                }
                return;
            }
            //是否完成 需处理批量场景
            if ($el.is('#isCompleted') || ($el = $el.parent()).is('#isCompleted')) {
                var isCompleted = !$el.hasClass('active');
                for (var i = 0; i < ids.length; i++) {
                    var task = cached_tasks[ids[i]];
                    var old = task.isCompleted();
                    task.setCompleted(isCompleted);
                    //额外逻辑
                    if (base.onCompletedChange)
                        base.onCompletedChange(task, old, isCompleted);
                }
                //批量情况的修正 TODO:与task内的setdetailcompleted逻辑调整进行复用
                if (ids.length > 1)
                    $el
                        [isCompleted ? 'addClass' : 'removeClass']('active')
                        [isCompleted ? 'addClass' : 'removeClass']('btn-success');
                return;
            }
        });
        this.$wrapper_detail.keyup(function (e) {
            var $el = $(e.target);
            var isSubject = $el.is('#subject');
            var isBody = $el.is('#body');
            if (!isSubject && !isBody) return;
            var task = cached_tasks[$el.parents('.region_detail').eq(0).attr('id')];
            if (isSubject)
                task.setSubject($el.val(), true);
            else if (isBody)
                task.setBody($el.val());
        });
        this.$wrapper_detail.change(function (e) {
            var $el = $(e.target);
            //dueTime调整 需处理批量场景
            if ($el.is('#dueTime')) {
                var ids = $el.parents('.region_detail');
                if (ids.length == 0) return;
                ids = ids.eq(0).attr('id').split(',');
                var tasks = [ids.length];
                var t = $.datepicker.parseDate('mm/dd/yy', $el.val());
                for (var i = 0; i < ids.length; i++) {
                    var task = cached_tasks[ids[i]];
                    //若此时编辑了新增的任务，由于临时id被修正，将无法找到新的id，因此外围需调用repairBatchdetailId
                    debuger.assert(task != null);
                    tasks[i] = task;
                    task.setDueTime(t); //TODO:调整格式yy-mm-dd
                }
                if (ids.length > 0)
                //额外逻辑
                    if (base.onDueTimeBatchChange)
                        base.onDueTimeBatchChange(tasks, t);
            }        });
        //允许额外的实现
        if (this.onPrepareBinds)
            this.onPrepareBinds();
    },
