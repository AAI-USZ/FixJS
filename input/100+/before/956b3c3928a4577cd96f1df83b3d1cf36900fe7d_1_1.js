function (storageModel) {
            this[storageModel.ItemName] = new $data.EntitySet(storageModel.LogicalType, this, storageModel.ItemName);
            this[storageModel.ItemName].name = storageModel.ItemName;
            this[storageModel.ItemName].tableName = storageModel.TableName;
            this._entitySetReferences[storageModel.LogicalType.name] = this[storageModel.ItemName];

            storageModel.EntitySetReference = this[storageModel.ItemName];
        }