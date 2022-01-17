function (input, output, symmetricKey, iv, operation) {
    this.log("_commonCrypt() called");
    // Get rid of the base64 encoding and convert to SECItems.
    let keyItem = this.makeSECItem(symmetricKey, true);
    this.log("keyItem: " + keyItem);
    let ivItem  = this.makeSECItem(iv, true);
    this.log("ivItem: " + ivItem);
    // Determine which (padded) PKCS#11 mechanism to use.
    // EG: AES_128_CBC --> CKM_AES_CBC --> CKM_AES_CBC_PAD
    let mechanism = this.nss.PK11_AlgtagToMechanism(this.algorithm);
    mechanism = this.nss.PK11_GetPadMechanism(mechanism);
    if (mechanism == this.nss.CKM_INVALID_MECHANISM)
      throw new Error("invalid algorithm (can't pad)");

    let ctx, symKey, slot, ivParam;
    try {
      ivParam = this.nss.PK11_ParamFromIV(mechanism, ivItem.address());
      if (ivParam.isNull())
        throw new Error("can't convert IV to param");

      slot = this.nss.PK11_GetInternalKeySlot();
      if (slot.isNull())
        throw new Error("can't get internal key slot");

      symKey = this.nss.PK11_ImportSymKey(slot, mechanism, this.nss.PK11_OriginUnwrap, operation, keyItem.address(), null);
      if (symKey.isNull())
        throw new Error("symkey import failed");

      ctx = this.nss.PK11_CreateContextBySymKey(mechanism, operation, symKey, ivParam);
      if (ctx.isNull())
        throw new Error("couldn't create context for symkey");

      let maxOutputSize = output.length;
      let tmpOutputSize = new ctypes.int(); // Note 1: NSS uses a signed int here...

      if (this.nss.PK11_CipherOp(ctx, output, tmpOutputSize.address(), maxOutputSize, input, input.length))
        throw new Error("cipher operation failed");

      let actualOutputSize = tmpOutputSize.value;
      let finalOutput = output.addressOfElement(actualOutputSize);
      maxOutputSize -= actualOutputSize;

      // PK11_DigestFinal sure sounds like the last step for *hashing*, but it
      // just seems to be an odd name -- NSS uses this to finish the current
      // cipher operation. You'd think it would be called PK11_CipherOpFinal...
      let tmpOutputSize2 = new ctypes.unsigned_int(); // Note 2: ...but an unsigned here!
      if (this.nss.PK11_DigestFinal(ctx, finalOutput, tmpOutputSize2.address(), maxOutputSize))
        throw new Error("cipher finalize failed");

      actualOutputSize += tmpOutputSize2.value;
      let newOutput = ctypes.cast(output, ctypes.unsigned_char.array(actualOutputSize));
      this.log(newOutput);
      return newOutput;
    } catch (e) {
      this.log("_commonCrypt: failed: " + e);
      throw e;
    } finally {
      if (ctx && !ctx.isNull())
        this.nss.PK11_DestroyContext(ctx, true);
      if (symKey && !symKey.isNull())
        this.nss.PK11_FreeSymKey(symKey);
      if (slot && !slot.isNull())
        this.nss.PK11_FreeSlot(slot);
      if (ivParam && !ivParam.isNull())
        this.nss.SECITEM_FreeItem(ivParam, true);
    }
  }