/*
 * Copyright © 2021-2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

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
