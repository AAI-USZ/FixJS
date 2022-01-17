function(){
            var uname = getValue($(this).val(),4,2,dataTable_images);
            $('input#IMAGE_UNAME',section_disks).val(uname);
            var target = getValue($(this).val(),4,12,dataTable_images);
            if (target && target != "--")
                $('input#TARGET',section_disks).val(target);
            else
                $('input#TARGET',section_disks).val('');
        }