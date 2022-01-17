function () {
        var value = gpii.windows.readRegistryKey("HKEY_CURRENT_USER", "Software\\Texthelp\\Read&Write10", "InstallPath", "REG_SZ").value;
        value += "\\ReadAndWrite.exe";
        gpii.launch.exec(value);
    }