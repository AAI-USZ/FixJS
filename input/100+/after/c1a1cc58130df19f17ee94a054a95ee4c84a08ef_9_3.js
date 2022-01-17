function(){
        var vm_id = $(this).attr('vmid');
        var disk_obj = {};
        switch($('select#attach_disk_type',this).val()){
        case "image":
            var im_id = $('select[name="IMAGE_ID"]',this).val();
            if (!im_id) {
                notifyError(tr("Please select an image to attach"));
                return false;
            }
            disk_obj.IMAGE_ID = $('select[name="IMAGE_ID"]',this).val();
            disk_obj.DEV_PREFIX = $('input[name="DEV_PREFIX"]',this).val();
            break;
        case "volatile":
            disk_obj.SIZE = $('input[name="SIZE"]',this).val();
            disk_obj.FORMAT = $('input[name="FORMAT"]',this).val();
            disk_obj.TYPE = $('select[name="TYPE"]',this).val();
            disk_obj.DEV_PREFIX = $('input[name="DEV_PREFIX"]',this).val();
//            disk_obj.READONLY = $('select[name="READONLY"]',this).val();
//            disk_obj.SAVE = $('save[name="SAVE"]',this).val();
            break;
        }

        var obj = { DISK : disk_obj };
        Sunstone.runAction("VM.attachdisk", vm_id, obj);
        return false;
    }