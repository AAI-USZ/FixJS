function template_info(div, url) {
  os_id = $("#host_operatingsystem_id :selected").attr("value");
  env_id = $("#host_environment_id :selected").attr("value");
  hostgroup_id = $("#host_hostgroup_id :selected").attr("value");
  build = $('input:radio[name$="[build]"]:checked').val();

  $(div).html('<img src="/images/spinner.gif" alt="Wait" />');
  $(div).load(url + "?operatingsystem_id=" + os_id + "&hostgroup_id=" + hostgroup_id + "&environment_id=" + env_id+"&provisioning="+build,
              function(response, status, xhr) {
                if (status == "error") {
                  $(div).html("<div class='alert alert-warning'><a class='close' data-di  smiss='alert'>&times;</a><p>Sorry but no templates were configured.</p></div>");
                }
              });
}