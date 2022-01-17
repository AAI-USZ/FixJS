function WC_initNSS(aNSSPath) {
    // Open the NSS library.
    this.fullPathToLib = aNSSPath;
    // XXX really want to be able to pass specific dlopen flags here.
    var nsslib;
    nsslib = ctypes.open(this.fullPathToLib);

    this.nsslib = nsslib;
    this.log("Initializing NSS types and function declarations...");

    this.nss = {};
    this.nss_t = {};

    // nsprpub/pr/include/prtypes.h#435
    // typedef PRIntn PRBool; --> int
    this.nss_t.PRBool = ctypes.int;
    // security/nss/lib/util/seccomon.h#91
    // typedef enum
    this.nss_t.SECStatus = ctypes.int;
    // security/nss/lib/softoken/secmodt.h#59
    // typedef struct PK11SlotInfoStr PK11SlotInfo; (defined in secmodti.h)
    //this.nss_t.PK11SlotInfo = ctypes.void_t;

    this.nss_t.PK11SlotInfo = ctypes.StructType(
      "PK11SlotInfo", [{ functionList: ctypes.voidptr_t },
                       { module:       ctypes.voidptr_t },
                       { needTest:     this.nss_t.PRBool },
                       { isPerm:       this.nss_t.PRBool },
                       { isHW:         this.nss_t.PRBool },
                       { isInternal:   this.nss_t.PRBool },    
                       { disabled:     this.nss_t.PRBool }]);
 

    // security/nss/lib/util/pkcs11t.h
    this.nss_t.CK_MECHANISM_TYPE = ctypes.unsigned_long;
    this.nss_t.CK_ATTRIBUTE_TYPE = ctypes.unsigned_long;
    this.nss_t.CK_KEY_TYPE       = ctypes.unsigned_long;
    this.nss_t.CK_OBJECT_HANDLE  = ctypes.unsigned_long;
    // security/nss/lib/softoken/secmodt.h#359
    // typedef enum PK11Origin
    this.nss_t.PK11Origin = ctypes.int;
    // PK11Origin enum values...
    this.nss.PK11_OriginUnwrap = 4;
    // security/nss/lib/softoken/secmodt.h#61
    // typedef struct PK11SymKeyStr PK11SymKey; (defined in secmodti.h)
    this.nss_t.PK11SymKey = ctypes.void_t;
    // security/nss/lib/util/secoidt.h#454
    // typedef enum
    this.nss_t.SECOidTag = ctypes.int;
    // security/nss/lib/util/seccomon.h#64
    // typedef enum
    this.nss_t.SECItemType = ctypes.int;
    // SECItemType enum values...
    this.nss.SIBUFFER = 0;
    // security/nss/lib/softoken/secmodt.h#62 (defined in secmodti.h)
    // typedef struct PK11ContextStr PK11Context;
    this.nss_t.PK11Context = ctypes.void_t;
    // Needed for SECKEYPrivateKey struct def'n, but I don't think we need to actually access it.
    this.nss_t.PLArenaPool = ctypes.void_t;
    // security/nss/lib/cryptohi/keythi.h#45
    // typedef enum
    this.nss_t.KeyType = ctypes.int;
    // security/nss/lib/softoken/secmodt.h#201
    // typedef PRUint32 PK11AttrFlags;
    this.nss_t.PK11AttrFlags = ctypes.unsigned_int;
    // security/nss/lib/util/secoidt.h#454
    // typedef enum
    this.nss_t.SECOidTag = ctypes.int;
    // security/nss/lib/util/seccomon.h#83
    // typedef struct SECItemStr SECItem; --> SECItemStr defined right below it
    this.nss_t.SECItem = ctypes.StructType(
      "SECItem", [{ type: this.nss_t.SECItemType },
                  { data: ctypes.unsigned_char.ptr },
                  { len : ctypes.int }]);
    // security/nss/lib/softoken/secmodt.h#65
    // typedef struct PK11RSAGenParamsStr --> def'n on line 139
    this.nss_t.PK11RSAGenParams = ctypes.StructType(
      "PK11RSAGenParams", [{ keySizeInBits: ctypes.int },
                           { pe : ctypes.unsigned_long }]);
    // security/nss/lib/cryptohi/keythi.h#233
    // typedef struct SECKEYPrivateKeyStr SECKEYPrivateKey; --> def'n right above it
    this.nss_t.SECKEYPrivateKey = ctypes.StructType(
      "SECKEYPrivateKey", [{ arena:        this.nss_t.PLArenaPool.ptr  },
                           { keyType:      this.nss_t.KeyType          },
                           { pkcs11Slot:   this.nss_t.PK11SlotInfo.ptr },
                           { pkcs11ID:     this.nss_t.CK_OBJECT_HANDLE },
                           { pkcs11IsTemp: this.nss_t.PRBool           },
                           { wincx:        ctypes.voidptr_t            },
                           { staticflags:  ctypes.unsigned_int         }]);
    // security/nss/lib/cryptohi/keythi.h#78
    // typedef struct SECKEYRSAPublicKeyStr --> def'n right above it
    this.nss_t.SECKEYRSAPublicKey = ctypes.StructType(
      "SECKEYRSAPublicKey", [{ arena:          this.nss_t.PLArenaPool.ptr },
                             { modulus:        this.nss_t.SECItem         },
                             { publicExponent: this.nss_t.SECItem         }]);
    // security/nss/lib/cryptohi/keythi.h#189
    // typedef struct SECKEYPublicKeyStr SECKEYPublicKey; --> def'n right above it
    this.nss_t.SECKEYPublicKey = ctypes.StructType(
      "SECKEYPublicKey", [{ arena:      this.nss_t.PLArenaPool.ptr    },
                          { keyType:    this.nss_t.KeyType            },
                          { pkcs11Slot: this.nss_t.PK11SlotInfo.ptr   },
                          { pkcs11ID:   this.nss_t.CK_OBJECT_HANDLE   },
                          { rsa:        this.nss_t.SECKEYRSAPublicKey } ]);
    // XXX: "rsa" et al into a union here!
    // { dsa: SECKEYDSAPublicKey },
    // { dh:  SECKEYDHPublicKey },
    // { kea: SECKEYKEAPublicKey },
    // { fortezza: SECKEYFortezzaPublicKey },
    // { ec:  SECKEYECPublicKey } ]);
    // security/nss/lib/util/secoidt.h#52
    // typedef struct SECAlgorithmIDStr --> def'n right below it
    this.nss_t.SECAlgorithmID = ctypes.StructType(
      "SECAlgorithmID", [{ algorithm:  this.nss_t.SECItem },
                         { parameters: this.nss_t.SECItem }]);
    // security/nss/lib/certdb/certt.h#98
    // typedef struct CERTSubjectPublicKeyInfoStrA --> def'n on line 160
    this.nss_t.CERTSubjectPublicKeyInfo = ctypes.StructType(
      "CERTSubjectPublicKeyInfo", [{ arena:            this.nss_t.PLArenaPool.ptr },
                                   { algorithm:        this.nss_t.SECAlgorithmID  },
                                   { subjectPublicKey: this.nss_t.SECItem         }]);


    // security/nss/lib/util/pkcs11t.h
    this.nss.CKK_RSA = 0x0;
    this.nss.CKM_RSA_PKCS_KEY_PAIR_GEN = 0x0000;
    this.nss.CKM_AES_KEY_GEN           = 0x1080;
    this.nss.CKA_ENCRYPT = 0x104;
    this.nss.CKA_DECRYPT = 0x105;
    this.nss.CKA_UNWRAP  = 0x107;

    // security/nss/lib/softoken/secmodt.h
    this.nss.PK11_ATTR_SESSION   = 0x02;
    this.nss.PK11_ATTR_PUBLIC    = 0x08;
    this.nss.PK11_ATTR_SENSITIVE = 0x40;

    // security/nss/lib/util/secoidt.h
    this.nss.SEC_OID_HMAC_SHA1            = 294;
    this.nss.SEC_OID_PKCS1_RSA_ENCRYPTION = 16;


    // security/nss/lib/pk11wrap/pk11pub.h#286
    // SECStatus PK11_GenerateRandom(unsigned char *data,int len);
    this.nss.PK11_GenerateRandom = nsslib.declare("PK11_GenerateRandom",
                                                  ctypes.default_abi, this.nss_t.SECStatus,
                                                  ctypes.unsigned_char.ptr, ctypes.int);
    // security/nss/lib/pk11wrap/pk11pub.h#74
    // PK11SlotInfo *PK11_GetInternalSlot(void);
    this.nss.PK11_GetInternalSlot = nsslib.declare("PK11_GetInternalSlot",
                                                   ctypes.default_abi, this.nss_t.PK11SlotInfo.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#73
    // PK11SlotInfo *PK11_GetInternalKeySlot(void);
    this.nss.PK11_GetInternalKeySlot = nsslib.declare("PK11_GetInternalKeySlot",
                                                      ctypes.default_abi, this.nss_t.PK11SlotInfo.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#328
    // PK11SymKey *PK11_KeyGen(PK11SlotInfo *slot,CK_MECHANISM_TYPE type, SECItem *param, int keySize,void *wincx);
    this.nss.PK11_KeyGen = nsslib.declare("PK11_KeyGen",
                                          ctypes.default_abi, this.nss_t.PK11SymKey.ptr,
                                          this.nss_t.PK11SlotInfo.ptr, this.nss_t.CK_MECHANISM_TYPE,
                                          this.nss_t.SECItem.ptr, ctypes.int, ctypes.voidptr_t);

    // SIGNING API //////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    // security/nss/pk11wrap/pk11pub.h#682
    // int PK11_SignatureLength(SECKEYPrivateKey *key);
    this.nss.PK11_SignatureLen = nsslib.declare("PK11_SignatureLen",
                                                ctypes.default_abi,
                                                ctypes.int,
                                                this.nss_t.SECKEYPrivateKey.ptr);

    // security/nss/pk11wrap/pk11pub.h#684
    // SECStatus PK11_Sign(SECKEYPrivateKey *key, SECItem *sig, SECItem *hash);
    this.nss.PK11_Sign = nsslib.declare("PK11_Sign",
                                        ctypes.default_abi,
                                        this.nss_t.SECStatus,
                                        this.nss_t.SECKEYPrivateKey.ptr,
                                        this.nss_t.SECItem.ptr,
                                        this.nss_t.SECItem.ptr);

    // security/nss/pk11wrap/pk11pub.h#687
    // SECStatus PK11_Verify(SECKEYPublicKey *key, SECItem *sig, SECItem *hash, void *wincx);
    this.nss.PK11_Verify = nsslib.declare("PK11_Verify",
                                          ctypes.default_abi,
                                          this.nss_t.SECStatus,
                                          this.nss_t.SECKEYPublicKey.ptr,
                                          this.nss_t.SECItem.ptr,
                                          this.nss_t.SECItem.ptr,
                                          ctypes.voidptr_t);
    // END SIGNING API
    //////////////////////////////////////////////////////////////////////////

    // security/nss/lib/pk11wrap/pk11pub.h#477
    // SECStatus PK11_ExtractKeyValue(PK11SymKey *symKey);
    this.nss.PK11_ExtractKeyValue = nsslib.declare("PK11_ExtractKeyValue",
                                                   ctypes.default_abi, this.nss_t.SECStatus,
                                                   this.nss_t.PK11SymKey.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#478
    // SECItem * PK11_GetKeyData(PK11SymKey *symKey);
    this.nss.PK11_GetKeyData = nsslib.declare("PK11_GetKeyData",
                                              ctypes.default_abi, this.nss_t.SECItem.ptr,
                                              this.nss_t.PK11SymKey.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#278
    // CK_MECHANISM_TYPE PK11_AlgtagToMechanism(SECOidTag algTag);
    this.nss.PK11_AlgtagToMechanism = nsslib.declare("PK11_AlgtagToMechanism",
                                                     ctypes.default_abi, this.nss_t.CK_MECHANISM_TYPE,
                                                     this.nss_t.SECOidTag);
    // security/nss/lib/pk11wrap/pk11pub.h#270
    // int PK11_GetIVLength(CK_MECHANISM_TYPE type);
    this.nss.PK11_GetIVLength = nsslib.declare("PK11_GetIVLength",
                                               ctypes.default_abi, ctypes.int,
                                               this.nss_t.CK_MECHANISM_TYPE);
    // security/nss/lib/pk11wrap/pk11pub.h#269
    // int PK11_GetBlockSize(CK_MECHANISM_TYPE type,SECItem *params);
    this.nss.PK11_GetBlockSize = nsslib.declare("PK11_GetBlockSize",
                                                ctypes.default_abi, ctypes.int,
                                                this.nss_t.CK_MECHANISM_TYPE, this.nss_t.SECItem.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#293
    // CK_MECHANISM_TYPE PK11_GetPadMechanism(CK_MECHANISM_TYPE);
    this.nss.PK11_GetPadMechanism = nsslib.declare("PK11_GetPadMechanism",
                                                   ctypes.default_abi, this.nss_t.CK_MECHANISM_TYPE,
                                                   this.nss_t.CK_MECHANISM_TYPE);
    // security/nss/lib/pk11wrap/pk11pub.h#271
    // SECItem *PK11_ParamFromIV(CK_MECHANISM_TYPE type,SECItem *iv);
    this.nss.PK11_ParamFromIV = nsslib.declare("PK11_ParamFromIV",
                                               ctypes.default_abi, this.nss_t.SECItem.ptr,
                                               this.nss_t.CK_MECHANISM_TYPE, this.nss_t.SECItem.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#301
    // PK11SymKey *PK11_ImportSymKey(PK11SlotInfo *slot, CK_MECHANISM_TYPE type, PK11Origin origin,
    //                               CK_ATTRIBUTE_TYPE operation, SECItem *key, void *wincx);
    this.nss.PK11_ImportSymKey = nsslib.declare("PK11_ImportSymKey",
                                                ctypes.default_abi, this.nss_t.PK11SymKey.ptr,
                                                this.nss_t.PK11SlotInfo.ptr, this.nss_t.CK_MECHANISM_TYPE, this.nss_t.PK11Origin,
                                                this.nss_t.CK_ATTRIBUTE_TYPE, this.nss_t.SECItem.ptr, ctypes.voidptr_t);
    // security/nss/lib/pk11wrap/pk11pub.h#672
    // PK11Context *PK11_CreateContextBySymKey(CK_MECHANISM_TYPE type, CK_ATTRIBUTE_TYPE operation,
    //                                         PK11SymKey *symKey, SECItem *param);
    this.nss.PK11_CreateContextBySymKey = nsslib.declare("PK11_CreateContextBySymKey",
                                                         ctypes.default_abi, this.nss_t.PK11Context.ptr,
                                                         this.nss_t.CK_MECHANISM_TYPE, this.nss_t.CK_ATTRIBUTE_TYPE,
                                                         this.nss_t.PK11SymKey.ptr, this.nss_t.SECItem.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#685
    // SECStatus PK11_CipherOp(PK11Context *context, unsigned char *out
    //                         int *outlen, int maxout, unsigned char *in, int inlen);
    this.nss.PK11_CipherOp = nsslib.declare("PK11_CipherOp",
                                            ctypes.default_abi, this.nss_t.SECStatus,
                                            this.nss_t.PK11Context.ptr, ctypes.unsigned_char.ptr,
                                            ctypes.int.ptr, ctypes.int, ctypes.unsigned_char.ptr, ctypes.int);
    // security/nss/lib/pk11wrap/pk11pub.h#688
    // SECStatus PK11_DigestFinal(PK11Context *context, unsigned char *data,
    //                            unsigned int *outLen, unsigned int length);
    this.nss.PK11_DigestFinal = nsslib.declare("PK11_DigestFinal",
                                               ctypes.default_abi, this.nss_t.SECStatus,
                                               this.nss_t.PK11Context.ptr, ctypes.unsigned_char.ptr,
                                               ctypes.unsigned_int.ptr, ctypes.unsigned_int);
    // security/nss/lib/pk11wrap/pk11pub.h#507
    // SECKEYPrivateKey *PK11_GenerateKeyPairWithFlags(PK11SlotInfo *slot,
    //                                                 CK_MECHANISM_TYPE type, void *param, SECKEYPublicKey **pubk,
    //                                                 PK11AttrFlags attrFlags, void *wincx);
    this.nss.PK11_GenerateKeyPairWithFlags = nsslib.declare("PK11_GenerateKeyPairWithFlags",
                                                            ctypes.default_abi, this.nss_t.SECKEYPrivateKey.ptr,
                                                            this.nss_t.PK11SlotInfo.ptr, this.nss_t.CK_MECHANISM_TYPE, ctypes.voidptr_t,
                                                            this.nss_t.SECKEYPublicKey.ptr.ptr, this.nss_t.PK11AttrFlags, ctypes.voidptr_t);
    // security/nss/lib/pk11wrap/pk11pub.h#466
    // SECStatus PK11_SetPrivateKeyNickname(SECKEYPrivateKey *privKey, const char *nickname);
    this.nss.PK11_SetPrivateKeyNickname = nsslib.declare("PK11_SetPrivateKeyNickname",
                                                         ctypes.default_abi, this.nss_t.SECStatus,
                                                         this.nss_t.SECKEYPrivateKey.ptr, ctypes.char.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#731
    // SECAlgorithmID * PK11_CreatePBEV2AlgorithmID(SECOidTag pbeAlgTag, SECOidTag cipherAlgTag,
    //                                              SECOidTag prfAlgTag, int keyLength, int iteration,
    //                                              SECItem *salt);
    this.nss.PK11_CreatePBEV2AlgorithmID = nsslib.declare("PK11_CreatePBEV2AlgorithmID",
                                                          ctypes.default_abi, this.nss_t.SECAlgorithmID.ptr,
                                                          this.nss_t.SECOidTag, this.nss_t.SECOidTag, this.nss_t.SECOidTag,
                                                          ctypes.int, ctypes.int, this.nss_t.SECItem.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#736
    // PK11SymKey * PK11_PBEKeyGen(PK11SlotInfo *slot, SECAlgorithmID *algid,  SECItem *pwitem, PRBool faulty3DES, void *wincx);
    this.nss.PK11_PBEKeyGen = nsslib.declare("PK11_PBEKeyGen",
                                             ctypes.default_abi, this.nss_t.PK11SymKey.ptr,
                                             this.nss_t.PK11SlotInfo.ptr, this.nss_t.SECAlgorithmID.ptr,
                                             this.nss_t.SECItem.ptr, this.nss_t.PRBool, ctypes.voidptr_t);
    // security/nss/lib/pk11wrap/pk11pub.h#574
    // SECStatus PK11_WrapPrivKey(PK11SlotInfo *slot, PK11SymKey *wrappingKey,
    //                            SECKEYPrivateKey *privKey, CK_MECHANISM_TYPE wrapType,
    //                            SECItem *param, SECItem *wrappedKey, void *wincx);
    this.nss.PK11_WrapPrivKey = nsslib.declare("PK11_WrapPrivKey",
                                               ctypes.default_abi, this.nss_t.SECStatus,
                                               this.nss_t.PK11SlotInfo.ptr, this.nss_t.PK11SymKey.ptr,
                                               this.nss_t.SECKEYPrivateKey.ptr, this.nss_t.CK_MECHANISM_TYPE,
                                               this.nss_t.SECItem.ptr, this.nss_t.SECItem.ptr, ctypes.voidptr_t);
    // security/nss/lib/cryptohi/keyhi.h#159
    // SECItem* SECKEY_EncodeDERSubjectPublicKeyInfo(SECKEYPublicKey *pubk);
    this.nss.SECKEY_EncodeDERSubjectPublicKeyInfo = nsslib.declare("SECKEY_EncodeDERSubjectPublicKeyInfo",
                                                                   ctypes.default_abi, this.nss_t.SECItem.ptr,
                                                                   this.nss_t.SECKEYPublicKey.ptr);
    // security/nss/lib/cryptohi/keyhi.h#165
    // CERTSubjectPublicKeyInfo * SECKEY_DecodeDERSubjectPublicKeyInfo(SECItem *spkider);
    this.nss.SECKEY_DecodeDERSubjectPublicKeyInfo = nsslib.declare("SECKEY_DecodeDERSubjectPublicKeyInfo",
                                                                   ctypes.default_abi, this.nss_t.CERTSubjectPublicKeyInfo.ptr,
                                                                   this.nss_t.SECItem.ptr);
    // security/nss/lib/cryptohi/keyhi.h#179
    // SECKEYPublicKey * SECKEY_ExtractPublicKey(CERTSubjectPublicKeyInfo *);
    this.nss.SECKEY_ExtractPublicKey = nsslib.declare("SECKEY_ExtractPublicKey",
                                                      ctypes.default_abi, this.nss_t.SECKEYPublicKey.ptr,
                                                      this.nss_t.CERTSubjectPublicKeyInfo.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#377
    // SECStatus PK11_PubWrapSymKey(CK_MECHANISM_TYPE type, SECKEYPublicKey *pubKey,
    //                              PK11SymKey *symKey, SECItem *wrappedKey);
    this.nss.PK11_PubWrapSymKey = nsslib.declare("PK11_PubWrapSymKey",
                                                 ctypes.default_abi, this.nss_t.SECStatus,
                                                 this.nss_t.CK_MECHANISM_TYPE, this.nss_t.SECKEYPublicKey.ptr,
                                                 this.nss_t.PK11SymKey.ptr, this.nss_t.SECItem.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#568
    // SECKEYPrivateKey *PK11_UnwrapPrivKey(PK11SlotInfo *slot,
    //                 PK11SymKey *wrappingKey, CK_MECHANISM_TYPE wrapType,
    //                 SECItem *param, SECItem *wrappedKey, SECItem *label,
    //                 SECItem *publicValue, PRBool token, PRBool sensitive,
    //                 CK_KEY_TYPE keyType, CK_ATTRIBUTE_TYPE *usage, int usageCount,
    //                 void *wincx);
    this.nss.PK11_UnwrapPrivKey = nsslib.declare("PK11_UnwrapPrivKey",
                                                 ctypes.default_abi, this.nss_t.SECKEYPrivateKey.ptr,
                                                 this.nss_t.PK11SlotInfo.ptr, this.nss_t.PK11SymKey.ptr,
                                                 this.nss_t.CK_MECHANISM_TYPE, this.nss_t.SECItem.ptr,
                                                 this.nss_t.SECItem.ptr, this.nss_t.SECItem.ptr,
                                                 this.nss_t.SECItem.ptr, this.nss_t.PRBool,
                                                 this.nss_t.PRBool, this.nss_t.CK_KEY_TYPE,
                                                 this.nss_t.CK_ATTRIBUTE_TYPE.ptr, ctypes.int,
                                                 ctypes.voidptr_t);
    // security/nss/lib/pk11wrap/pk11pub.h#447
    // PK11SymKey *PK11_PubUnwrapSymKey(SECKEYPrivateKey *key, SECItem *wrapppedKey,
    //         CK_MECHANISM_TYPE target, CK_ATTRIBUTE_TYPE operation, int keySize);
    this.nss.PK11_PubUnwrapSymKey = nsslib.declare("PK11_PubUnwrapSymKey",
                                                   ctypes.default_abi, this.nss_t.PK11SymKey.ptr,
                                                   this.nss_t.SECKEYPrivateKey.ptr, this.nss_t.SECItem.ptr,
                                                   this.nss_t.CK_MECHANISM_TYPE, this.nss_t.CK_ATTRIBUTE_TYPE, ctypes.int);
    // security/nss/lib/pk11wrap/pk11pub.h#675
    // void PK11_DestroyContext(PK11Context *context, PRBool freeit);
    this.nss.PK11_DestroyContext = nsslib.declare("PK11_DestroyContext",
                                                  ctypes.default_abi, ctypes.void_t,
                                                  this.nss_t.PK11Context.ptr, this.nss_t.PRBool);
    // security/nss/lib/pk11wrap/pk11pub.h#299
    // void PK11_FreeSymKey(PK11SymKey *key);
    this.nss.PK11_FreeSymKey = nsslib.declare("PK11_FreeSymKey",
                                              ctypes.default_abi, ctypes.void_t,
                                              this.nss_t.PK11SymKey.ptr);
    // security/nss/lib/pk11wrap/pk11pub.h#70
    // void PK11_FreeSlot(PK11SlotInfo *slot);
    this.nss.PK11_FreeSlot = nsslib.declare("PK11_FreeSlot",
                                            ctypes.default_abi, ctypes.void_t,
                                            this.nss_t.PK11SlotInfo.ptr);
    // security/nss/lib/util/secitem.h#114
    // extern void SECITEM_FreeItem(SECItem *zap, PRBool freeit);
    this.nss.SECITEM_FreeItem = nsslib.declare("SECITEM_FreeItem",
                                               ctypes.default_abi, ctypes.void_t,
                                               this.nss_t.SECItem.ptr, this.nss_t.PRBool);
    // security/nss/lib/cryptohi/keyhi.h#193
    // extern void SECKEY_DestroyPublicKey(SECKEYPublicKey *key);
    this.nss.SECKEY_DestroyPublicKey = nsslib.declare("SECKEY_DestroyPublicKey",
                                                      ctypes.default_abi, ctypes.void_t,
                                                      this.nss_t.SECKEYPublicKey.ptr);
    // security/nss/lib/cryptohi/keyhi.h#186
    // extern void SECKEY_DestroyPrivateKey(SECKEYPrivateKey *key);
    this.nss.SECKEY_DestroyPrivateKey = nsslib.declare("SECKEY_DestroyPrivateKey",
                                                       ctypes.default_abi, ctypes.void_t,
                                                       this.nss_t.SECKEYPrivateKey.ptr);
    // security/nss/lib/util/secoid.h#103
    // extern void SECOID_DestroyAlgorithmID(SECAlgorithmID *aid, PRBool freeit);
    this.nss.SECOID_DestroyAlgorithmID = nsslib.declare("SECOID_DestroyAlgorithmID",
                                                        ctypes.default_abi, ctypes.void_t,
                                                        this.nss_t.SECAlgorithmID.ptr, this.nss_t.PRBool);
    // security/nss/lib/cryptohi/keyhi.h#58
    // extern void SECKEY_DestroySubjectPublicKeyInfo(CERTSubjectPublicKeyInfo *spki);
    this.nss.SECKEY_DestroySubjectPublicKeyInfo = nsslib.declare("SECKEY_DestroySubjectPublicKeyInfo",
                                                                 ctypes.default_abi, ctypes.void_t,
                                                                 this.nss_t.CERTSubjectPublicKeyInfo.ptr);

    this.nss.PK11_GetTokenName = nsslib.declare("PK11_GetTokenName", ctypes.default_abi, ctypes.char.ptr, this.nss_t.PK11SlotInfo.ptr);


  }