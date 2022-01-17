function _handleEnableJSLint() {
        var enabled = !JSLintUtils.getEnabled();
        JSLintUtils.setEnabled(enabled);
        CommandManager.get(Commands.DEBUG_JSLINT).setChecked(enabled);
    }