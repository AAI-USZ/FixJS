function test_header_iteration() {
  var ctx = makeTestContext(),
      dA = DateUTC(2010, 0, 4),
      uidA1 = 101, uidA2 = 102, uidA3 = 103,
      dB = DateUTC(2010, 0, 5),
      uidB1 = 111, uidB2 = 112, uidB3 = 113,
      dC = DateUTC(2010, 0, 6),
      uidC1 = 121, uidC2 = 122, uidC3 = 123,
      dFuture = DateUTC(2011, 0, 1);

  ctx.insertHeader(dA, uidA1);
  ctx.insertHeader(dA, uidA2);
  ctx.insertHeader(dA, uidA3);
  ctx.insertHeader(dB, uidB1);
  ctx.insertHeader(dB, uidB2);
  ctx.insertHeader(dB, uidB3);

  // split to [B's, A's]
  var olderBlockInfo = ctx.storage._splitHeaderBlock(
    ctx.storage._headerBlockInfos[0], ctx.storage._headerBlocks[0],
    3 * $_imapslice.HEADER_EST_SIZE_IN_BYTES);
  ctx.storage._headerBlockInfos.push(olderBlockInfo);

  ctx.insertHeader(dC, uidC1);
  ctx.insertHeader(dC, uidC2);
  ctx.insertHeader(dC, uidC3);

  // split [C's and B's, A's] to [C's, B's, A's]
  olderBlockInfo = ctx.storage._splitHeaderBlock(
    ctx.storage._headerBlockInfos[0], ctx.storage._headerBlocks[0],
    3 * $_imapslice.HEADER_EST_SIZE_IN_BYTES);
  ctx.storage._headerBlockInfos.splice(1, 0, olderBlockInfo);

  console.log(JSON.stringify(ctx.storage._headerBlockInfos));

  // Expect, where 'first' is first reported, and 'last' is last reported,
  // with no explicit time constraints.  For new-to-old, this means that
  // firstDate >= lastDate.
  function chexpect(firstDate, firstUID, lastDate, lastUID) {
    var seen = [];
    return function(headers, moreExpected) {
      console.log(
        "headers!", headers.length, ":",
        headers.map(function(x) { return "(" + x.date + ", " + x.id + ")"; }));

      // zero message case
      if (!headers.length) {
        if (moreExpected)
          return;
        do_check_eq(firstDate, null);
        do_check_eq(firstUID, null);
        do_check_eq(lastDate, null);
        do_check_eq(lastUID, null);
        return;
      }

      if (!seen.length) {
        do_check_eq(firstDate, headers[0].date);
        do_check_eq(firstUID, headers[0].id);
      }
      seen = seen.concat(headers);
      if (!moreExpected) {
        var last = seen.length - 1;
        do_check_eq(lastUID, seen[last].id);
        do_check_eq(lastDate, seen[last].date);
      }
    };
  }

  // -- getMessagesInImapDateRange
  // Effectively unconstrained date range, no limit
  ctx.storage.getMessagesInImapDateRange(
    0, dFuture, null, null,
    chexpect(dC, uidC3, dA, uidA1));
  // Effectively unconstrained date range, limited
  ctx.storage.getMessagesInImapDateRange(
    0, dFuture, 4, 4,
    chexpect(dC, uidC3, dB, uidB3));

  // Constrained date ranges, no limit
  ctx.storage.getMessagesInImapDateRange(
    dB, dC, null, null,
    chexpect(dB, uidB3, dB, uidB1));
  ctx.storage.getMessagesInImapDateRange(
    dA, dC, null, null,
    chexpect(dB, uidB3, dA, uidA1));
  // Constrained date ranges, limited
  ctx.storage.getMessagesInImapDateRange(
    dA, dC, 1, 1,
    chexpect(dB, uidB3, dB, uidB3));
  ctx.storage.getMessagesInImapDateRange(
    dA, dC, 2, 2,
    chexpect(dB, uidB3, dB, uidB2));
  ctx.storage.getMessagesInImapDateRange(
    dA, dC, 3, 3,
    chexpect(dB, uidB3, dB, uidB1));
  ctx.storage.getMessagesInImapDateRange(
    dA, dC, 4, 4,
    chexpect(dB, uidB3, dA, uidA3));

  // -- getMessagesBeforeMessage
  // start from last message, no limit
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC3, null,
    chexpect(dC, uidC2, dA, uidA1));
  // start from last message, limit avoids block crossing
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC3, 2,
    chexpect(dC, uidC2, dC, uidC1));
  // start from last message, limit allows block crossing
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC3, 5,
    chexpect(dC, uidC2, dB, uidB1));
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC3, 6,
    chexpect(dC, uidC2, dA, uidA3));

  // start from non-last message, no limit
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC2, null,
    chexpect(dC, uidC1, dA, uidA1));
  // start from non-last message, limit avoids block crossing
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC2, 1,
    chexpect(dC, uidC1, dC, uidC1));
  // start from non-last message, limit allows block crossing
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC2, 4,
    chexpect(dC, uidC1, dB, uidB1));
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC2, 5,
    chexpect(dC, uidC1, dA, uidA3));
  ctx.storage.getMessagesBeforeMessage(
    dC, uidC1, 2,
    chexpect(dB, uidB3, dB, uidB2));


  // start from first message, nothing to find before
  ctx.storage.getMessagesBeforeMessage(
    dA, uidA1, null,
    chexpect(null, null, null, null));


  // -- getMessagesAfterMessage
  // The time ordering of the headers is always the same (most recent in
  // a group at index 0, least recent at the last index) in a block, but
  // this requires different logic than chexpect...
  function rexpect(firstDate, firstUID, lastDate, lastUID) {
    var seen = [];
    return function(headers, moreExpected) {
      console.log(
        "headers!", headers.length, ":",
        headers.map(function(x) { return "(" + x.date + ", " + x.id + ")"; }));

      // zero message case
      if (!headers.length) {
        if (moreExpected)
          return;
        do_check_eq(firstDate, null);
        do_check_eq(firstUID, null);
        do_check_eq(lastDate, null);
        do_check_eq(lastUID, null);
        return;
      }

      if (!seen.length) {
        var last = headers.length - 1;
        do_check_eq(lastUID, headers[last].id);
        do_check_eq(lastDate, headers[last].date);
      }
      seen = headers.concat(seen);
      if (!moreExpected) {
        do_check_eq(firstDate, headers[0].date);
        do_check_eq(firstUID, headers[0].id);
      }
    };
  }
  // start from first message, no limit
  ctx.storage.getMessagesAfterMessage(
    dA, uidA1, null,
    rexpect(dC, uidC3, dA, uidA2));
  // start from last message, limit avoids block crossing
  ctx.storage.getMessagesAfterMessage(
    dA, uidA1, 2,
    rexpect(dA, uidA3, dA, uidA2));
  // start from last message, limit allows block crossing
  ctx.storage.getMessagesAfterMessage(
    dA, uidA1, 5,
    rexpect(dB, uidB3, dA, uidA2));
  ctx.storage.getMessagesAfterMessage(
    dA, uidA1, 6,
    rexpect(dC, uidC1, dA, uidA2));

  // start from non-first message, no limit
  ctx.storage.getMessagesAfterMessage(
    dA, uidA2, null,
    rexpect(dC, uidC3, dA, uidA3));
  // start from non-first message, limit avoids block crossing
  ctx.storage.getMessagesAfterMessage(
    dA, uidA2, 1,
    rexpect(dA, uidA3, dA, uidA3));
  // start from non-first message, limit allows block crossing
  ctx.storage.getMessagesAfterMessage(
    dA, uidA2, 4,
    rexpect(dB, uidB3, dA, uidA3));
  ctx.storage.getMessagesAfterMessage(
    dA, uidA2, 5,
    rexpect(dC, uidC1, dA, uidA3));
  ctx.storage.getMessagesAfterMessage(
    dA, uidA3, 2,
    rexpect(dB, uidB2, dB, uidB1));


  // start from first message, nothing to find after
  ctx.storage.getMessagesAfterMessage(
    dC, uidC3, null,
    chexpect(null, null, null, null));
}