function MacCppEntriesProvider(nmExec, targetRootFS) {
  UnixCppEntriesProvider.call(this, nmExec, targetRootFS);
  // Note an empty group. It is required, as UnixCppEntriesProvider expects 3 groups.
  this.FUNC_RE = /^([0-9a-fA-F]{8,16}) ()[iItT] (.*)$/;
}