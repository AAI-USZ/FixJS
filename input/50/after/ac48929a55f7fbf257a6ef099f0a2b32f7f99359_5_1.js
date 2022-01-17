function cleanDateInput(str) {
    str = str.trim().replace(/^(just )?now|\.+$/i, '');
    return convertAsianDigits(str);
  }