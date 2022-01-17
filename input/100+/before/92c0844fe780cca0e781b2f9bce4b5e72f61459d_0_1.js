function () {
    afterEach(function (done) {
      fs.unlink('casket.kct', function (err) {
        done();
      });
    });

    it('should create a DB object', function () {
      db = new DB();
      db.should.be.an.instanceOf(DB);
    });


    // 
    // open
    // 
    describe('when call `open` method', function () {
      describe('with specific path -> `casket.kct`, mode -> `OREADER + OWRITER + OCREATE` object', function () {
        it('will catch `success` callback', function (done) {
          db.open({
            path: 'casket.kct',
            mode: DB.OREADER + DB.OWRITER + DB.OCREATE
          }, function (err) {
            if (err) { done(err); }
            done();
          });
        });
        describe('when call `close` method', function () {
          it('will catch `success` callback', function (done) {
            db.close(function (err) {
              if (err) { done(err); }
              done();
            });
          });
        });
      });
      describe('with specific params nothing', function () {
        it('will catch `success` callback', function (done) {
          db.open(function (err) {
            if (err) { done(err); }
            db.close(function (err) {
              if (err) { done(err); }
              done();
            });
          });
        });
      });
    });


    // 
    // close
    //
    describe('db not open', function () {
      describe('when call `close` method', function () {
        it('should be `INVALID` error', function (done) {
          db.close(function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('call `close` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should be `Success`', function (done) {
            db.open(function (err) {
              if (err) { return done(err); }
              db.close();
              done();
            });
          });
        });
        describe('with specific `object`', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              db.close({ key: 1 });
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              db.close(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
    });


    //
    // set
    //
    describe('when call `set` method', function () {
      describe('with specific `key` -> `hoge1`, `value` -> `1`', function () {
        it('should catch `success` callback', function (done) {
          db1.set({ key: 'hoge1', value: '1' }, function (err) {
            if (err) { done(err); }
            done();
          });
        });
        describe('when call `get` method', function () {
          describe('with specific `key` -> `hoge1`', function () {
            it('should catch `success` callback into `1` value', function (done) {
              db1.get({ key: 'hoge1' }, function (err, value) {
                if (err) { done(err); }
                value.should.eql('1');
                done();
              });
            });
          });
        });
      });
      describe('with specific `key` -> `ほげ１`, `value` -> `ほえ`', function () {
        it('should catch `success` callback', function (done) {
          db1.set({ key: 'ほげ１', value: 'ほえ' }, function (err) {
            if (err) { done(err); }
            done();
          });
        });
        describe('when call `get` method', function () {
          describe('with specific `key` -> `ほげ１', function () {
            it('should catch `success` callback into `ほえ` value', function (done) {
              db1.get({ key: 'ほげ１' }, function (err, value) {
                if (err) { done(err); }
                value.should.eql('ほえ');
                done();
              });
            });
          });
          describe('when call `remove` method', function () {
            describe('with specific `key` -> `ほげ１', function () {
              it('should catch `success` callback', function (done) {
                db1.remove({ key: 'ほげ１' }, function (err) {
                  if (err) { done(err); }
                  done();
                });
              });
              describe('when call `get` method', function () {
                it('should catch `err` callback into `NOREC` value at `code` property', function (done) {
                  db1.get({ key: 'ほげ１' }, function (err) {
                    err.should.be.a('object');
                    err.should.have.property('code');
                    err.code.should.eql(Error.NOREC);
                    done();
                  });
                });
              });
            });
          });
        });
      });
      describe('with specific `key` -> `ほhogeげ`, `value` -> `ほ1え`', function () {
        it('should catch `success` callback', function (done) {
          db1.set({ key: 'ほhogeげ', value: 'ほ1え' }, function (err) {
            if (err) { done(err); }
            done();
          });
        });
        describe('when call `get` method', function () {
          describe('with specific `key` -> `ほhogeげ`', function () {
            it('should catch `success` callback into `ほ1え` value', function (done) {
              db1.get({ key: 'ほhogeげ' }, function (err, value) {
                if (err) { done(err); }
                value.should.eql('ほ1え');
                done();
              });
            });
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.set({ value: '1' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific `value`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.set({ key: 'hoge1' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific `key` & `value`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.set({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.set();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.set({ key: 1, value: 'hoge' });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `value` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.set({ key: 'hoge', value: {} });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.set('hoge');
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.set({ key: 'hoge1', value: 'foo' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    //
    // get
    //
    describe('when call `get` method', function () {
      describe('with specific `key` -> `norecord`', function () {
        it('should catch `err` callback into `NOREC` value at `code` property', function (done) {
          db1.get({ key: 'norecord' }, function (err) {
            err.should.be.a('object');
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.get({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.get();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.get({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.get(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.get({ key: 'hoge1' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    // 
    // clear
    //
    describe('db not open', function () {
      describe('when call `clear` method', function () {
        it('should be `INVALID` error', function (done) {
          db.clear(function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });
    describe('db open', function () {
      describe('when call `clear` method', function () {
        it('should be clear ', function (done) {
          db1.clear(function (err) {
            if (err) { return done(err); }
            db1.get({ key: 'norecord' }, function (err) {
              err.should.be.a('object');
              err.should.have.property('code');
              err.code.should.eql(Error.NOREC);
              done();
            });
          });
        });
      });
      describe('call `clear` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should be `Success`', function (done) {
            db1.clear();
            done();
          });
        });
        describe('with specific `object`', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              db1.clear({ key: 1 });
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              db1.clear(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
    });


    // 
    // add
    //
    describe('when call `add` method', function () {
      it('will catch `success` callback', function (done) {
        db1.add({ key: 'hoge1', value: '111' }, function (err) {
          if (err) { done(err); }
          done();
        });
      });
      describe('when call `get` method', function () {
        it('with catch `success` callback into `111` value', function (done) {
          db1.get({ key: 'hoge1' }, function (err, value) {
            if (err) { done(err); }
            value.should.eql('111');
            done();
          });
        });
      });
      describe('when call `add` method', function () {
        it('with catch `success` callback', function (done) {
          db1.add({ key: 'hoge1', value: '222' }, function (err) {
            err.should.be.a('object');
            err.should.have.property('code');
            err.code.should.eql(Error.DUPREC);
            done();
          });
        });
        describe('when call `get` method', function () {
          it('with catch `success` callback into `111` value', function (done) {
            db1.get({ key: 'hoge1' }, function (err, value) {
              if (err) { done(err); }
              value.should.eql('111');
              done();
            });
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.add({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.add();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.add({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.add(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.add({ key: 'hoge1', value: '112' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    // 
    // append
    //
    describe('when call `append` method', function () {
      it('will catch `success` callback', function (done) {
        db1.append({ key: 'hoge2', value: 'hello' }, function (err) {
          if (err) { done(err); }
          done();
        });
      });
      describe('when call `get` method', function () {
        it('with catch `success` callback into `hello` value', function (done) {
          db1.get({ key: 'hoge2' }, function (err, value) {
            if (err) { done(err); }
            value.should.eql('hello');
            done();
          });
        });
      });
      describe('when call `append` method', function () {
        it('with catch `success` callback', function (done) {
          db1.append({ key: 'hoge2', value: ',world' }, function (err) {
            if (err) { done(err); }
            done();
          });
        });
        describe('when call `get` method', function () {
          it('with catch `success` callback into `hello,world` value', function (done) {
            db1.get({ key: 'hoge2' }, function (err, value) {
              if (err) { done(err); }
              value.should.eql('hello,world');
              done();
            });
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.append({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.append();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.append({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.append(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.append({ key: 'hoge1', value: '112' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    //
    // remove
    //
    describe('when call `remove` method', function () {
      describe('with specific `key` -> `norecord`', function () {
        it('should catch `err` callback into `NOREC` value at `code` property', function (done) {
          db1.remove({ key: 'norecord' }, function (err) {
            err.should.be.a('object');
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.remove({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.remove();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.remove({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.remove(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.remove({ key: 'hoge1' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    //
    // replace
    //
    describe('when call `replace` method', function () {
      describe('with specific `key` -> `hoge3`, `value` -> `replace`', function () {
        it('should catch `success` callback', function (done) {
          db1.set({ key: 'hoge3', value: '1' }, function (err) {
            if (err) { done(err); }
            db1.replace({ key: 'hoge3', value: 'replace' }, function (err) {
              if (err) { done(err); }
              db1.get({ key: 'hoge3' }, function (err, value) {
                if (err) { done(err); }
                value.should.eql('replace');
                done();
              });
            });
          });
        });
      });
      describe('with specific `key` -> `norecord`', function () {
        it('should catch `err` callback into `NOREC` value at `code` property', function (done) {
          db1.replace({ key: 'norecord', value: 'norecord' }, function (err) {
            err.should.be.a('object');
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.replace({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.replace();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.replace({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.replace(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.replace({ key: 'hoge1', value: 'foo' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    // 
    // seize
    //
    describe('when call `seize` method', function () {
      describe('with specific `key` -> `hoge3`', function () {
        it('should catch `success` callback', function (done) {
          db1.seize({ key: 'hoge3' }, function (err, value) {
            if (err) { done(err); }
            value.should.eql('replace');
            db1.get({ key: 'hoge3' }, function (err) {
              err.should.be.a('object');
              err.should.have.property('code');
              err.code.should.eql(Error.NOREC);
              done();
            });
          });
        });
      });
      describe('with specific `key` -> `norecord`', function () {
        it('should catch `err` callback into `NOREC` value at `code` property', function (done) {
          db1.seize({ key: 'norecord' }, function (err) {
            err.should.be.a('object');
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.seize({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.seize();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.seize({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.seize(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with db not open', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db.seize({ key: 'hoge3', value: 'foo' }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
    });


    // 
    // increment
    //
    describe('when call `increment` method', function () {
      describe('and no record', function () {
        afterEach(function (done) {
          db1.remove({ key: 'hoge4' }, function (err) {
            if (err) { console.error(err); }
            done();
          });
        });
        describe('with specific `key` -> `hoge4`, `num` -> `1`, `orig` -> `1`', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4', num: 1, orig: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(2);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `num` -> `1` (ommit `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4', num: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(1);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `orig` -> `1` (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4', orig: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(1);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4` (ommit `num`, `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4' }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `num` -> `10`, `orig` -> negative infinity', function () {
          it('should catch `error` callback', function (done) {
            db1.increment({ key: 'hoge4', num: 10, orig: Number.NEGATIVE_INFINITY }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `orig` -> negative infinity (ommit `num`)', function () {
          it('should catch `error` callback', function (done) {
            db1.increment({ key: 'hoge4', orig: Number.NEGATIVE_INFINITY }, function (err, value) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `num` -> `10`, `orig` -> positive infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4', num: 10, orig: Number.POSITIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(10);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4`, `orig` -> positive infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4', orig: Number.POSITIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0);
              done();
            });
          });
        });
      });
      describe('and already numeric record', function () {
        beforeEach(function (done) {
          db1.remove({ key: 'hoge4already' }, function (err) {
            if (err) { console.error(err); }
            db1.increment({ key: 'hoge4already', num: 11, orig: 0 }, function (err) {
              if (err) { return done(err); }
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `num` -> `1`, `orig` -> `1`', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', num: 1, orig: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(12);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `num` -> `1` (ommit `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', num: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(12);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `orig` -> `1` (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', orig: 1 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already` (ommit `num`, `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already' }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `num` -> `10`, `orig` -> negative infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', num: 10, orig: Number.NEGATIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(21);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `orig` -> negative infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', orig: Number.NEGATIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `num` -> `10`, `orig` -> positive infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', num: 10, orig: Number.POSITIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(10);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge4already`, `orig` -> positive infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment({ key: 'hoge4already', orig: Number.POSITIVE_INFINITY }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0);
              done();
            });
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.increment({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.increment();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.increment({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.increment(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
    });


    // 
    // increment_double
    //
    describe('when call `increment_double` method', function () {
      describe('and no record', function () {
        afterEach(function (done) {
          db1.remove({ key: 'hoge5' }, function (err) {
            if (err) { console.error(err); }
            done();
          });
        });
        describe('with specific `key` -> `hoge5`, `num` -> `1.0`, `orig` -> `1.0`', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5', num: 1.0, orig: 1.0 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(2.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `num` -> `1.0` (ommit `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5', num: 1.0 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(1.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `orig` -> `1.0` (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5', orig: 1.0 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(1.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5` (ommit `num`, `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5' }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `num` -> `10.0`, `orig` -> negative infinity', function () {
          it('should catch `error` callback', function (done) {
            db1.increment_double({
              key: 'hoge5',
              num: 10.0,
              orig: Number.NEGATIVE_INFINITY
            }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `orig` -> negative infinity (ommit `num`)', function () {
          it('should catch `error` callback', function (done) {
            db1.increment_double({
              key: 'hoge5',
              orig: Number.NEGATIVE_INFINITY
            }, function (err, value) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `num` -> `10.0`, `orig` -> positive infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5',
              num: 10.0,
              orig: Number.POSITIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(10.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5`, `orig` -> positive infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5',
              orig: Number.POSITIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0.0);
              done();
            });
          });
        });
      });
      describe('and already numeric record', function () {
        beforeEach(function (done) {
          db1.remove({ key: 'hoge5already' }, function (err) {
            if (err) { console.error(err); }
            db1.increment_double({ key: 'hoge5already', num: 11.0, orig: 0.0 }, function (err) {
              if (err) { return done(err); }
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `num` -> `1.0`, `orig` -> `1.0`', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              num: 1.0,
              orig: 1.0
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(12.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `num` -> `1.0` (ommit `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5already', num: 1.0 }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(12.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `orig` -> `1.0` (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              orig: 1.0
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already` (ommit `num`, `orig`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({ key: 'hoge5already' }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `num` -> `10.0`, `orig` -> negative infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              num: 10.0,
              orig: Number.NEGATIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(21.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `orig` -> negative infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              orig: Number.NEGATIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(11.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `num` -> `10.0`, `orig` -> positive infinity', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              num: 10.0,
              orig: Number.POSITIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(10.0);
              done();
            });
          });
        });
        describe('with specific `key` -> `hoge5already`, `orig` -> positive infinity (ommit `num`)', function () {
          it('should catch `success` callback', function (done) {
            db1.increment_double({
              key: 'hoge5already',
              orig: Number.POSITIVE_INFINITY
            }, function (err, value) {
              if (err) { return done(err); }
              value.should.eql(0.0);
              done();
            });
          });
        });
      });
      describe('with no specific `key`', function () {
        it('should catch `err` callback into `INVALID` value at `code` property', function (done) {
          db1.increment_double({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should catch `Error` exception', function (done) {
          try {
            db1.increment_double();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.increment_double({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should catch `TypeError` exception', function (done) {
          try {
            db1.increment_double(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
    });


    // 
    // increment_double
    //
    describe('no record', function () {
      describe('when call `cas` method', function () {
        beforeEach(function (done) {
          db1.remove({ key: 'cas_no_record' }, function (err) {
            if (err) { console.error(err); }
            done();
          });
        });
        describe('with specific `key` -> `cas_no_record`, `oval` -> `hello`, `nval` -> `world`', function () {
          it('should be `LOGIC` error', function (done) {
            db1.cas({ key: 'cas_no_record', oval: 'hello', nval: 'world' }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `cas_no_record`, `oval` -> `hello` (ommit `nval`)', function () {
          it('should be `LOGIC` error', function (done) {
            db1.cas({ key: 'cas_no_record', oval: 'hello' }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `cas_no_record`, `nval` -> `world` (ommit `oval`)', function () {
          it('should create `cas_no_record` key record', function (done) {
            db1.cas({ key: 'cas_no_record', nval: 'world' }, function (err) {
              if (err) { return done(err); }
              db1.get({ key: 'cas_no_record' }, function (err, value) {
                if (err) { return done(err); }
                value.should.eql('world');
                done();
              });
            });
          });
        });
      });
    });
    describe('already record', function () {
      describe('when call `cas` method', function () {
        beforeEach(function (done) {
          db1.set({ key: 'cas_record', value: '1234' }, function (err) {
            if (err) { return done(err); }
            done();
          });
        });
        describe('with specific `key` -> `cas_record`, `oval` -> `1234`, `nval` -> `5678`', function () {
          it('should change from `1234` to `5678` value', function (done) {
            db1.cas({ key: 'cas_record', oval: '1234', nval: '5678' }, function (err) {
              if (err) { return done(err); }
              db1.get({ key: 'cas_record' }, function (err, value) {
                if (err) { return done(err); }
                value.should.eql('5678');
                done();
              });
            });
          });
        });
        describe('with specific `key` -> `cas_record`, `oval` -> `hello`, `nval` -> `5678`', function () {
          it('should be `LOGIC` error', function (done) {
            db1.cas({ key: 'cas_record', oval: 'hello', nval: '5678' }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
        describe('with specific `key` -> `cas_record`, `oval` -> `1234` (ommit `nval`)', function () {
          it('should remove `cas_record` key record', function (done) {
            db1.cas({ key: 'cas_record', oval: '1234' }, function (err) {
              if (err) { return done(err); }
              db1.get({ key: 'cas_record' }, function (err, value) {
                err.should.have.property('code');
                err.code.should.eql(Error.NOREC);
                done();
              });
            });
          });
        });
        describe('with specific `key` -> `cas_record`, `nval` -> `5678` (ommit `oval`)', function () {
          it('should be `LOGIC` error', function (done) {
            db1.cas({ key: 'cas_record', nval: '5678' }, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.LOGIC);
              done();
            });
          });
        });
      });
    });
    describe('when call `cas` method', function () {
      describe('with no specific `key`', function () {
        it('should be `INVALID` error', function (done) {
          db1.cas({}, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.INVALID);
            done();
          });
        });
      });
      describe('with no specific parameter', function () {
        it('should occured `Error` exception', function (done) {
          try {
            db1.cas();
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific `key` type not string', function () {
        it('should occured `TypeError` exception', function (done) {
          try {
            db1.cas({ key: 1 });
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
      describe('with specific parameter not object', function () {
        it('should occured `TypeError` exception', function (done) {
          try {
            db1.cas(1);
          } catch (e) {
            e.should.be.an.instanceOf(TypeError);
            done();
          }
        });
      });
    });


    // 
    // count
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var cdb = new DB();
        cdb.count(function (err, ret) {
          ret.should.eql(-1);
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var cdb;
      var fname = 'count.kch';
      before(function (done) {
        cdb = new DB();
        cdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        cdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `count` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should be `success`', function (done) {
            cdb.count();
            done();
          });
        });
        describe('with specific `object`', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.count({ key: 1 });
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.count(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('when not regist record in db', function () {
        it('should be `0` value', function (done) {
          cdb.count(function (err, ret) {
            if (err) { return done(err); }
            ret.should.eql(0);
            done();
          });
        });
        describe('when add record', function () {
          it('should be `1` value', function (done) {
            cdb.add({ key: 'hoge', value: 'hello' }, function (err) {
              if (err) { return done(err); }
              cdb.count(function (err, ret) {
                if (err) { return done(err); }
                ret.should.eql(1);
                done();
              });
            });
          });
          describe('when remove record', function () {
            it('should be `0` value', function (done) {
              cdb.remove({ key: 'hoge' }, function (err) {
                if (err) { return done(err); }
                cdb.count(function (err, ret) {
                  if (err) { return done(err); }
                  ret.should.eql(0);
                  done();
                });
              });
            });
          });
        });
      });
    });


    // 
    // size
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var cdb = new DB();
        cdb.size(function (err, ret) {
          ret.should.eql(-1);
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var cdb;
      var fname = 'size.kch';
      before(function (done) {
        cdb = new DB();
        cdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        cdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `size` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should be `success` exception', function (done) {
            cdb.size();
            done();
          });
        });
        describe('with specific `object`', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.size({ key: 1 });
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.size(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('when not regist record in db', function () {
        it('should be `success` the getting size value', function (done) {
          cdb.size(function (err, ret) {
            if (err) { return done(err); }
            ret.should.be.above(0);
            done();
          });
        });
        describe('when add record', function () {
          it('should be `1` value', function (done) {
            cdb.add({ key: 'hoge', value: 'hello' }, function (err) {
              if (err) { return done(err); }
              cdb.size(function (err, ret) {
                if (err) { return done(err); }
                ret.should.be.above(0);
                done();
              });
            });
          });
          describe('when remove record', function () {
            it('should be `0` value', function (done) {
              cdb.remove({ key: 'hoge' }, function (err) {
                if (err) { return done(err); }
                cdb.size(function (err, ret) {
                  if (err) { return done(err); }
                  ret.should.be.above(0);
                  done();
                });
              });
            });
          });
        });
      });
    });


    // 
    // status
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var cdb = new DB();
        cdb.status(function (err, ret) {
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var cdb;
      var fname = 'status.kch';
      before(function (done) {
        cdb = new DB();
        cdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        cdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `status` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should be `success`', function (done) {
            cdb.status();
            done();
          });
        });
        describe('with specific `object`', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.status({ key: 1 });
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              cdb.status(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('when not regist record in db', function () {
        it('should be `success` the getting status info object', function (done) {
          cdb.status(function (err, ret) {
            if (err) { return done(err); }
            ret.should.be.an.instanceOf(Object);
            ret.should.have.property('size');
            ret.should.have.property('path');
            ret.count.should.eql('0');
            done();
          });
        });
        describe('when add record', function () {
          it('should be `success` the getting status info object', function (done) {
            cdb.add({ key: 'hoge', value: 'hello' }, function (err) {
              if (err) { return done(err); }
              cdb.status(function (err, ret) {
                if (err) { return done(err); }
                ret.should.be.an.instanceOf(Object);
                ret.should.have.property('size');
                ret.should.have.property('path');
                ret.count.should.eql('1');
                done();
              });
            });
          });
          describe('when remove record', function () {
            it('should be `success` the getting status info object', function (done) {
              cdb.remove({ key: 'hoge' }, function (err) {
                if (err) { return done(err); }
                cdb.status(function (err, ret) {
                  if (err) { return done(err); }
                  ret.should.be.an.instanceOf(Object);
                  ret.should.have.property('size');
                  ret.should.have.property('path');
                  ret.count.should.eql('0');
                  done();
                });
              });
            });
          });
        });
      });
    });


    // 
    // check
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var mdb = new DB();
        mdb.check(function (err, ret) {
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var mdb;
      var fname = 'check.kch';
      before(function (done) {
        mdb = new DB();
        mdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        mdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `check` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.check();
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with no specific `key`', function () {
          it('should be `INVALID` error', function (done) {
            mdb.check({}, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.INVALID);
              done();
            });
          });
        });
        describe('with specific `key` type not string', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.check({ key: 1 });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.check(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('not regist record in db', function () {
        it('should be `NOREC` error', function (done) {
          mdb.check({ key: 'check1' }, function (err, size) {
            size.should.eql(-1);
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
        describe('add key `check1` record', function () {
          it('should be get `5` size', function (done) {
            mdb.add({ key: 'check1', value: 'hello' }, function (err) {
              if (err) { return done(err); }
              mdb.check({ key: 'check1' }, function (err, size) {
                if (err) { return done(err); }
                size.should.eql(5);
                done();
              });
            });
          });
          describe('add key `チェック1` record', function () {
            it('should be get `9` size', function (done) {
              mdb.add({ key: 'チェック1', value: 'チェック' }, function (err) {
                if (err) { return done(err); }
                mdb.check({ key: 'チェック1' }, function (err, size) {
                  if (err) { return done(err); }
                  size.should.eql(12);
                  done();
                });
              });
            });
          });
        });
      });
    });


    // 
    // get_bulk
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var mdb = new DB();
        mdb.get_bulk({ keys: [ 'key1', 'key2' ] }, function (err, values) {
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var mdb;
      var fname = 'get_bulk.kct';
      before(function (done) {
        mdb = new DB();
        mdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        mdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `get_bulk` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.get_bulk();
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with no specific `keys`', function () {
          it('should be `INVALID` error', function (done) {
            mdb.get_bulk({}, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.INVALID);
              done();
            });
          });
        });
        describe('with specific `keys` type not array', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.get_bulk({ keys: 1 });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific `atomic` type not boolean', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.get_bulk({ keys: [ 'key1' ], atomic: 'hello' });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.get_bulk(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('not regist record in db', function () {
        it('should be `NOREC` error', function (done) {
          mdb.get_bulk({ keys: [ 'key1' ], atomic: false }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
        describe('add `10` records', function () {
          var keys = null;

          before(function (done) {
            var cnt = 0;
            var max = 10;
            keys = [];
            (function fn (cnt, keys, cb) {
              cnt++;
              var key = 'key' + cnt.toString();
              mdb.set({ key: key, value: key }, function (err) {
                if (err) { return cb(err); }
                keys.push(key);
                if (cnt === max) { return cb(null, keys); }
                return fn(cnt, keys, cb);
              });
            })(cnt, keys, function (err, keys) {
              if (err) { return done(err); }
              done();
            });
          });

          describe('with specific all registered keys', function () {
            it('should be get `10` records', function (done) {
              mdb.get_bulk({ keys: keys, atomic: true }, function (err, recs) {
                if (err) { return done(err); }
                recs.should.have.keys(keys);
                for (var i = 0; i < 10; i++) {
                  recs['key' + (i + 1)].should.eql('key' + (i + 1));
                }
                done();
              });
            });
          });
          describe('with specific half registered keys & half not registered keys', function () {
            it('should be get `5` records', function (done) {
              keys = [];
              for (var i = 0; i < 5; i++) {
                keys.push('key' + (i + 1));
              }
              keys.push('hoge');
              keys.push('foo');
              keys.push('bar');
              keys.push('buz');
              keys.push('moge');
              mdb.get_bulk({ keys: keys }, function (err, recs) {
                if (err) { return done(err); }
                Object.keys(recs).should.have.length(5);
                for (var i = 0; i < 5; i++) {
                  recs['key' + (i + 1)].should.eql('key' + (i + 1));
                }
                done();
              });
            });
          });
        });
      });
    });


    // 
    // set_bulk
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var mdb = new DB();
        mdb.set_bulk({ recs: {
          key1: 'key1',
          key2: 'key2'
        }}, function (err, values) {
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var mdb;
      var fname = 'set_bulk.kct';
      before(function (done) {
        mdb = new DB();
        mdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        mdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `set_bulk` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.set_bulk();
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with no specific `keys`', function () {
          it('should be `INVALID` error', function (done) {
            mdb.set_bulk({}, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.INVALID);
              done();
            });
          });
        });
        describe('with specific `keys` type not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.set_bulk({ recs: 1 });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific `atomic` type not boolean', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.set_bulk({ recs: { key1: 'key1' }, atomic: 'hello' });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.set_bulk(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('set `10` records', function () {
        it('should be `success`', function (done) {
          var recs = {};
          var max = 10;
          for (var i = 0; i < max; i++) {
            recs['key' + (i + 1)] = 'key' + (i + 1);
          }
          mdb.set_bulk({ recs: recs, atomic: false }, function (err, num) {
            if (err) { return done(err); }
            num.should.eql(max);
            mdb.get_bulk({ keys: Object.keys(recs) }, function (err, ret) {
              if (err) { return done(err); }
              ret.should.eql(recs);
              mdb.count(function (err, cnt) {
                if (err) { return done(err); }
                cnt.should.eql(max);
                done();
              });
            });
          });
        });
      });
    });


    // 
    // remove_bulk
    //
    describe('db not open', function () {
      it('should be `INVALID` error', function (done) {
        var mdb = new DB();
        mdb.remove_bulk({ keys: [ 'key1', 'key2' ] }, function (err, num) {
          err.should.have.property('code');
          err.code.should.eql(Error.INVALID);
          done();
        });
      });
    });
    describe('db open', function () {
      var mdb;
      var fname = 'remove_bulk.kct';
      before(function (done) {
        mdb = new DB();
        mdb.open({ path: fname, mode: DB.OWRITER + DB.OCREATE }, function (err) {
          if (err) { return done(err); }
          done();
        });
      });
      after(function (done) {
        mdb.close(function (err) {
          if (err) { return done(err); }
          fs.unlink(fname, function () {
            done();
          });
        });
      });
      describe('call `remove_bulk` method parameter check', function () {
        describe('with no specific parameter', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.remove_bulk();
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with no specific `keys`', function () {
          it('should be `INVALID` error', function (done) {
            mdb.remove_bulk({}, function (err) {
              err.should.have.property('code');
              err.code.should.eql(Error.INVALID);
              done();
            });
          });
        });
        describe('with specific `keys` type not array', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.remove_bulk({ keys: 1 });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific `atomic` type not boolean', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.remove_bulk({ keys: [ 'key1' ], atomic: 'hello' });
            } catch(e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
        describe('with specific parameter not object', function () {
          it('should occured `TypeError` exception', function (done) {
            try {
              mdb.remove_bulk(1);
            } catch (e) {
              e.should.be.an.instanceOf(TypeError);
              done();
            }
          });
        });
      });
      describe('not regist record in db', function () {
        it('should be `NOREC` error', function (done) {
          mdb.remove_bulk({ keys: [ 'key1' ], atomic: false }, function (err) {
            err.should.have.property('code');
            err.code.should.eql(Error.NOREC);
            done();
          });
        });
        describe('add `10` records', function () {
          var recs;
          beforeEach(function (done) {
            recs = {};
            for (var i = 0; i < 10; i++) {
              recs['key' + (i + 1)] = 'key' + (i + 1);
            }
            mdb.set_bulk({ recs: recs }, function (err, num) {
              if (err) { return done(err); }
              done();
            });
          });

          describe('with specific all registered keys', function () {
            it('should be remove `10` records', function (done) {
              mdb.remove_bulk({ keys: Object.keys(recs) }, function (err, num) {
                if (err) { return done(err); }
                num.should.eql(10);
                mdb.count(function (err, cnt) {
                  if (err) { return done(err); }
                  cnt.should.eql(0);
                  done();
                });
              });
            });
          });
          describe('with specific half registered keys & half not registered keys', function () {
            it('should be remove `10` records', function (done) {
              var keys = [];
              for (var i = 0; i < 5; i++) {
                keys.push('key' + (i + 1));
              }
              keys.push('hoge');
              keys.push('foo');
              keys.push('bar');
              keys.push('buz');
              keys.push('moge');
              mdb.remove_bulk({ keys: keys }, function (err, num) {
                if (err) { return done(err); }
                num.should.eql(5);
                mdb.count(function (err, cnt) {
                  if (err) { return done(err); }
                  cnt.should.eql(5);
                  done();
                });
              });
            });
          });
        });
      });
    });



  }