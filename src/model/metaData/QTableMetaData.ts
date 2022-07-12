/*
 * QQQ - Low-code Application Framework for Engineers.
 * Copyright (C) 2021-2022.  Kingsrook, LLC
 * 651 N Broad St Ste 205 # 6917 | Middletown DE 19709 | United States
 * contact@kingsrook.com
 * https://github.com/Kingsrook/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { QFieldMetaData } from "./QFieldMetaData";

/*******************************************************************************
 ** Meta-Data to define a table in a QQQ instance.
 **
 *******************************************************************************/
export class QTableMetaData
{
   name: string;
   label: string;
   primaryKeyField: string;
   isRequired: string;
   fields?: Map<string, QFieldMetaData>;

   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.isRequired = object.isRequired;
      this.primaryKeyField = object.primaryKeyField;

      if (object.fields)
      {
         this.fields = new Map<string, QFieldMetaData>();
         for (const key in object.fields)
         {
            this.fields.set(key, new QFieldMetaData(object.fields[key]));
         }
      }
   }
}
