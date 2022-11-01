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

import {QFieldMetaData} from "./QFieldMetaData";
import {QTableSection} from "./QTableSection";

/*******************************************************************************
 ** Meta-Data to define a table in a QQQ instance.
 **
 *******************************************************************************/
export class QTableMetaData
{
   name: string;
   label: string;
   isHidden: boolean = false;
   primaryKeyField: string;
   fields?: Map<string, QFieldMetaData>;
   iconName?: string;
   sections?: QTableSection[];
   widgets?: string[];
   capabilities: Set<string>

   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.isHidden = object.isHidden;
      this.primaryKeyField = object.primaryKeyField;
      this.iconName = object.iconName;
      this.widgets = object.widgets;

      if (object.fields)
      {
         this.fields = new Map<string, QFieldMetaData>();
         for (const key in object.fields)
         {
            this.fields.set(key, new QFieldMetaData(object.fields[key]));
         }
      }

      if (object.sections)
      {
         this.sections = [];
         for (let i = 0; i < object.sections.length; i++)
         {
            this.sections.push(new QTableSection(object.sections[i]));
         }
      }

      this.capabilities = new Set<string>();
      if(object.capabilities)
      {
         for (var i = 0; i < object.capabilities.length; i++)
         {
            this.capabilities.add(object.capabilities[i]);
         }
      }
   }
}
