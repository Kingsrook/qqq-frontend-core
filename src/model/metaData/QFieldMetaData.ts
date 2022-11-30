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

import {AdornmentType} from "./AdornmentType";
import {FieldAdornment} from "./FieldAdornment";
import {QFieldType} from "./QFieldType";

/*******************************************************************************
 ** Meta-data to represent a single field in a table.
 **
 *******************************************************************************/
export class QFieldMetaData
{
   name: string;
   label: string;
   defaultValue: string;
   type: QFieldType;
   isRequired: boolean = false;
   isEditable: boolean = true;
   possibleValueSourceName: string;
   displayFormat: string;
   adornments?: FieldAdornment[];

   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.defaultValue = object.defaultValue;
      this.type = object.type;
      this.isRequired = object.isRequired;
      this.isEditable = object.isEditable;
      this.possibleValueSourceName = object.possibleValueSourceName;
      this.displayFormat = object.displayFormat;

      if (object.adornments)
      {
         this.adornments = [];
         for (var i = 0; i < object.adornments.length; i++)
         {
            this.adornments.push(new FieldAdornment(object.adornments[i]));
         }
      }
   }


   hasAdornment(type: AdornmentType): boolean
   {
      const adornment = this.getAdornment(type);
      return (adornment !== null);
   }


   getAdornment(type: AdornmentType): FieldAdornment | null
   {
      if (this.adornments)
      {
         for (let i = 0; i < this.adornments.length; i++)
         {
            if (type === this.adornments[i].type)
            {
               return (this.adornments[i]);
            }
         }
      }

      return (null);
   }
}
