import {QFieldType} from './QFieldType';

/*******************************************************************************
 **
 *******************************************************************************/
export class QFieldMetaData
{
   name: string;
   label: string;
   type: QFieldType;

   constructor(name: string, type: QFieldType)
   {
      this.name = name;
      this.label = name.substring(0, 1).toUpperCase() + name.substring(1);
      this.type = type;
   }
}