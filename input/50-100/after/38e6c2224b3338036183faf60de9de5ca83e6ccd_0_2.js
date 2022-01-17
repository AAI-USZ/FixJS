function(aViolationType, aSourceFile, aScriptSample, aLineNum) {
    // allowsInlineScript and allowsEval both return true when report-only mode
    // is enabled, resulting in a call to this function. Therefore we need to
    // check that the policy was in fact violated before logging any violations
    switch (aViolationType) {
    case Ci.nsIContentSecurityPolicy.VIOLATION_TYPE_INLINE_SCRIPT:
      if (!this._policy.allowsInlineScripts)
        this._asyncReportViolation('self',null,'inline script base restriction',
                                   'violated base restriction: Inline Scripts will not execute',
                                   aSourceFile, aScriptSample, aLineNum);
      break;
    case Ci.nsIContentSecurityPolicy.VIOLATION_TYPE_EVAL:
      if (!this._policy.allowsEvalInScripts)
        this._asyncReportViolation('self',null,'eval script base restriction',
                                   'violated base restriction: Code will not be created from strings',
                                   aSourceFile, aScriptSample, aLineNum);
      break;
    }
  }