function AddFamilyMember() {
    $("#span_message").hide();
    var familyId = $("#hidden_familyId").val();
    var surname = $("#text_surname").val();
    var homephone = $("#text_homePhone").val();
    var address1 = $("#text_address1").val();
    var address2 = $("#text_address2").val();
    var address3 = $("#text_address3").val();
    var address4 = $("#text_address4").val();
    var lat = $("#hidden_lat").val();
    var lng = $("#hidden_lng").val();
    var groupId = $("#hidden_groupId").val();

    ClearForm();
    $("#hidden_familyId").val(familyId);
    $("#hidden_groupId").val(groupId);
    $("#text_surname").val(surname);
    $("#text_homePhone").val(homephone);
    $("#text_address1").val(address1);
    $("#text_address2").val(address2);
    $("#text_address3").val(address3);
    $("#text_address4").val(address4);
    $("#hidden_lat").val(lat);
    $("#hidden_lng").val(lng);
    $("#groupAdmin_securityRole").val(roleName);
    $("#hidden_roleName").val(roleName);
    $("#RoleName").val(roleName);
}