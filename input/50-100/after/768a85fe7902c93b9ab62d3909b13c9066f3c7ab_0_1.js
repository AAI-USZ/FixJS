function TestCommand1() {
        var command1 = CommandManager.get("extensionTest.command1");
        if (!command1) {
            return;
        }
        var command2 = CommandManager.get("extensionTest.command2");
        if (!command2) {
            return;
        }

        var checked = command1.getChecked();
        if (checked) {
            alert("Unchecking self. Disabling next.");
            command2.setEnabled(false);
        } else {
            alert("Checking self. Enabling next.");
            command2.setEnabled(true);
        }
        command1.setChecked(!checked);
    }