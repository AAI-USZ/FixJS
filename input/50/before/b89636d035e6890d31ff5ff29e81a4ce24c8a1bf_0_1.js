function onDeviceReady() {
    var deviceId=device.uuid; //insert native code here to get DeviceID
    $.post("http://tali.irail.be/REST/Device.php?device="+deviceId,function (data){
        //alert(data);
    });      
}