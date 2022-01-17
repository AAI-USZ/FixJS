function expandQuotedPrefix(s, depth) {
  if (s.charCodeAt(0) === CHARCODE_NEWLINE)
    return replyQuotePrefixStringsNoSpace[depth];
  return replyQuotePrefixStrings[depth];
}