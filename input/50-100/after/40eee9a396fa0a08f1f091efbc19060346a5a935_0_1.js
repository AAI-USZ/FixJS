function dragEnd(e){
            $(this).unbind("mousemove", draging).unbind("mouseup", dragEnd);
            if (isMove) {
                handler.unbind("mouseover", dragDisable).unbind("mouseout", dragDisable);
                whenDragEnd(start);
            } else {
                whenClick(e);
                isMove = true;
            }
        }