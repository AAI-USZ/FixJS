function () {
                            var p = remove ? item.remove() :  this.joinTable.where(this.__createJoinTableInsertRemoveQuery(model, item)).remove();
                        }