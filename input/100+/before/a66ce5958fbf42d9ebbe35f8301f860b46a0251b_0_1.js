function buildWorkerInstanceDetails() {
        // Instance ID
        worker_details = "<li><b>" + instances[selected_instance].id + "</b></li>";
        // Instance state
        worker_details += "<li>State: " + instances[selected_instance].worker_status + "</li><li>Alive: " + instances[selected_instance].time_in_state + "</li>";
        // Instance IP
        worker_details += "<li>IP: " + instances[selected_instance].public_ip + "</li>";
        // Instance type
        worker_details += "<li>Type: " + instances[selected_instance].instance_type + "</li>";
        // Blank line
        worker_details += "<li>&nbsp;</li>";
        worker_details += "<li>";
        worker_details += "<div id='instance_status_icons'>";
        // Filesystem status
        worker_details += "<div title=\"Filesystems\" class='status_" + ARRAY_COLORS[1 + get_vol_ind(instances[selected_instance])] + "'>&nbsp;</div>";
        // Permissions status
    	worker_details += "<div title=\"Permissions\" class='status_" + ARRAY_COLORS[1 + parseInt(instances[selected_instance].get_cert)] + "'>&nbsp;</div>";
        // Scheduler status
    	worker_details += "<div title=\"Scheduler\" class='status_" + ARRAY_COLORS[1 + parseInt(instances[selected_instance].sge_started)] + "'>&nbsp;</div>";
        // Reboot button
        worker_details += "<img src=\"/cloud/static/images/reboot.png\" height=10px title=\"Reboot instance\" alt=\"Reboot instance\" onclick=\"return rebootInstance('" + instances[selected_instance].id + "')\">&nbsp;";
        // Terminate button
        worker_details += "<img src=\"/cloud/static/images/terminate.png\" height=10px title=\"Terminate instance\" alt=\"Terminate instance\" onclick=\"return terminateInstance('" + instances[selected_instance].id + "')\">";
        worker_details += "</div>";
        worker_details += "</li>";

        return worker_details;
}