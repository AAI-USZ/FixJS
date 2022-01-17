function(){
            var option = $('option:selected',this);
            var uname = getValue(option.attr('elem_id'),1,2,dataTable_images);
            $('input#IMAGE_UNAME',section_disks).val(uname);
            var target = getValue(option.attr('elem_id'),1,12,dataTable_images);
            if (target && target != "--")
                $('input#TARGET',section_disks).val(target);
            else
                $('input#TARGET',section_disks).val('');
        }