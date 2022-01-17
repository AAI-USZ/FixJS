function (e) {//TODO:调整keydown和keyup事件，避免持续keydown导致的损耗
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
        }