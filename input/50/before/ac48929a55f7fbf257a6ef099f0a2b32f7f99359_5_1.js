function cleanDateInput(str) {
    str = str.trim().replace(/\.+$/,'').replace(/^just /, '').replace(/^now$/, '');
    return convertAsianDigits(str);
  }