/*
 * Copyright © 2021-2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

import {QFieldMetaData} from "./QFieldMetaData";

/*******************************************************************************
 **
 *******************************************************************************/
export class QTableMetaData
{
   name: string;
   label: string;
   fields: Map<string, QFieldMetaData>;

   constructor(name: string)
   {
      this.name = name;
      this.label = name.substring(0, 1).toUpperCase() + name.substring(1);
      this.fields = new Map<string, QFieldMetaData>();
   }
}
