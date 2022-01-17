function log() {
    WScript.Echo(exec("%comspec% /c adb.bat logcat"));
}