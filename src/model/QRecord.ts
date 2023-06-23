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


/*******************************************************************************
 ** Data Record within qqq.  e.g., a single row from a database.
 **
 *******************************************************************************/
export class QRecord
{
   tableName: string;
   recordLabel: string;
   values: Map<string, any>;
   displayValues: Map<string, string>;
   associatedRecords?: Map<string, QRecord[]>;

   constructor(object: any)
   {
      this.tableName = object.tableName;
      this.recordLabel = object.recordLabel;

      this.values = new Map<string, any>();
      for (const key in object.values)
      {
         this.values.set(key, object.values[key]);
      }

      this.displayValues = new Map<string, any>();
      for (const key in object.displayValues)
      {
         this.displayValues.set(key, object.displayValues[key]);
      }

      if (object.associatedRecords)
      {
         this.associatedRecords = new Map<string, QRecord[]>();
         for (const key in object.associatedRecords)
         {
            const list: QRecord[] = [];
            this.associatedRecords.set(key, list);
            for (let i = 0; i < object.associatedRecords[key].length; i++)
            {
               list.push(new QRecord(object.associatedRecords[key][i]));
            }
         }
      }
   }
}

