function (item, joinTable, model, self) {
                                if (remove) {
                                    item.remove();
                                } else {
                                    joinTable.where(self.__createJoinTableInsertRemoveQuery(model, item))["remove"]();
                                }
                                return model;
                            }