function changePerflvl(n,file)
{
    if (CheckForNVFile(file))
    {
	nv_log("Setting new perflvl: " + n);
	
	let [success, argv] = GLib.shell_parse_argv(_("pkexec /bin/sh -c " + "\"" + " echo " + n + " > " + file + "\""));	
	GLib.spawn_async_with_pipes(null, argv, null, GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD, 
					null, null);
    }
}