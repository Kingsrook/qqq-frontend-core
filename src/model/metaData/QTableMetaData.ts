import {QFieldMetaData} from "./QFieldMetaData";
import {QFieldType} from "./QFieldType";

/*******************************************************************************
 **
 *******************************************************************************/
export class QTableMetaData
{
   name: string;
   label: string;
   primaryKeyField: string;
   fields: any; // todo? Map<string, QFieldMetaData>;

   constructor(name: string)
   {
      this.name = name;
      this.label = name.substring(0, 1).toUpperCase() + name.substring(1);
      this.primaryKeyField = "id";
      this.fields = {"id": new QFieldMetaData("id", QFieldType.INTEGER)};
   }
}