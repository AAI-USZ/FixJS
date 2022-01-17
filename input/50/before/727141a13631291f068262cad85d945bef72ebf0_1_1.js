function (event) {
        if (confirm("Restore defaults will erases all changes you make.\n Are you sure you want to continue?!\n"))
            ui.PrefsDlg.restore_defaults();
    }