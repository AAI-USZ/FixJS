function printDisks(vm_info){
    var im_sel = makeSelectOptions(dataTable_images,
                                   1, //id col - trick -> reference by name!
                                   4, //name col
                                   [10,10,10],
                                   [tr("DISABLED"),tr("LOCKED"),tr("ERROR")]
                                  );
   var html ='\
   <form style="display:inline-block;width:80%" id="hotplugging_form" vmid="'+vm_info.ID+'">\
     <table class="info_table">\
       <thead>\
         <tr><th colspan="2">'+tr("Disks information")+'</th></tr>\
       </thead>\
       <tbody>\
       ';


    var disks = []
    if ($.isArray(vm_info.TEMPLATE.DISK))
        disks = vm_info.TEMPLATE.DISK
    else if (!$.isEmptyObject(vm_info.TEMPLATE.DISK))
        disks = [vm_info.TEMPLATE.DISK]

    if (!disks.length){
        html += '<tr id="no_disks_tr"><td class="key_td">\
                   '+tr("No disks to show")+'\
                   </td><td class="value_td"></td></tr>';
        html += '</tbody></table></form>';
        return html;
    }

    for (var i = 0; i < disks.length; i++){
        var disk = disks[i];
        html += '<tr disk_id="'+(disk.DISK_ID)+'"><td class="key_td">';
        html += disk.DISK_ID + ' - ' +
            (disk.IMAGE ? disk.IMAGE : "Volatile") + '</td>';
        html += '<td class="value_td"><span>'+disk.TYPE+'</span>';
        html += ' <i class="icon-trash detach_disk"></i></td></tr>';
    }

    html += '</tbody>\
     </table>';

    if (vm_info.STATE != "3"){
        html +='</form>';
        return html;
    }

    html += '<table class="info_table">\
       <thead>\
         <tr><th colspan="2">'+tr("Attach disk to running VM")+'</th></tr>\
       </thead>\
       <tbody>\
         <tr><td class="key_td"><label>'+tr("Type")+':</label></td>\
             <td class="value_td">\
                 <select id="attach_disk_type">\
                    <option value="image">'+tr("Existing image")+'</option>\
<!--             <option value="volatile">'+tr("Volatile disk")+'</option>-->\
                 </select>\
             </td>\
        </tr>\
         <tr class="at_image"><td class="key_td"><label>'+tr("Select image")+':</label></td>\
             <td class="value_td">\
                   <select name="IMAGE_ID">\
                   '+im_sel+'\
                   </select>\
             </td>\
         </tr>\
         <tr class="at_volatile"><td class="key_td"><label>'+tr("Size")+':</label></td>\
             <td class="value_td">\
                <input type="text" name="SIZE"></input>\
             </td>\
         </tr>\
         <tr class="at_volatile"><td class="key_td"><label>'+tr("Format")+':</label></td>\
             <td class="value_td">\
                <input type="text" name="FORMAT"></input>\
             </td>\
         </tr>\
         <tr class="at_volatile"><td class="key_td"><label>'+tr("Type")+':</label></td>\
             <td class="value_td">\
                   <select name="TYPE">\
                       <option value="swap">'+tr("swap")+'</option>\
                       <option value="fs">'+tr("fs")+'</option>\
                   </select>\
             </td>\
         </tr>\
         <tr class="at_volatile at_image"><td class="key_td"><label>'+tr("Device prefix")+':</label></td>\
             <td class="value_td">\
                <input type="text" name="DEV_PREFIX" value="sd"></input>\
             </td>\
         </tr>\
         <tr class="at_volatile"><td class="key_td"><label>'+tr("Readonly")+':</label></td>\
             <td class="value_td">\
                   <select name="READONLY">\
                       <option value="NO">'+tr("No")+'</option>\
                       <option value="YES">'+tr("Yes")+'</option>\
                   </select>\
             </td>\
        </tr>\
        <tr class="at_volatile"><td class="key_td"><label>'+tr("Save")+':</label></td>\
             <td class="value_td">\
                   <select name="SAVE">\
                       <option value="NO">'+tr("No")+'</option>\
                       <option value="YES">'+tr("Yes")+'</option>\
                   </select>\
             </td>\
        </tr>\
        <tr><td class="key_td"></td>\
             <td class="value_td">\
                   <button type="submit" value="VM.attachdisk">Attach</button>\
             </td>\
        </tr>\
       </tbody>\
     </table></form>';

    return html;
}