function onDeviceReady() {
    deviceUUID=device.uuid; //insert native code here to get DeviceID
    $.post("http://tali.irail.be/REST/Device.php?device="+deviceUUID,function (data){
        //alert(data);
    });      
}