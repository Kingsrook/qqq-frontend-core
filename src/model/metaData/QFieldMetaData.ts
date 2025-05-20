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

import {QPossibleValue} from "../../model/QPossibleValue";
import {AdornmentType} from "./AdornmentType";
import {FieldAdornment} from "./FieldAdornment";
import {QFieldType} from "./QFieldType";
import {QHelpContent} from "./QHelpContent";

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
   isHeavy: boolean = false;
   possibleValueSourceName: string;
   inlinePossibleValueSource?: QPossibleValue[];
   displayFormat: string;
   gridColumns?: number;
   adornments?: FieldAdornment[];
   helpContents?: QHelpContent[];
   behaviors?: any[];
   supplementalFieldMetaData: Map<String, any> = new Map();
   maxLength?: number;


   /*******************************************************************************
    **
    *******************************************************************************/
   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.defaultValue = object.defaultValue;
      this.type = object.type;
      this.isRequired = object.isRequired;
      this.isEditable = object.isEditable;
      this.isHeavy = object.isHeavy;
      this.possibleValueSourceName = object.possibleValueSourceName;
      this.displayFormat = object.displayFormat;
      this.gridColumns = object.gridColumns;
      this.maxLength = object.maxLength;

      if (object.adornments)
      {
         this.adornments = [];
         for (let i = 0; i < object.adornments.length; i++)
         {
            this.adornments.push(new FieldAdornment(object.adornments[i]));
         }
      }

      if (object.inlinePossibleValueSource)
      {
         this.inlinePossibleValueSource = [];
         for (let i = 0; i < object.inlinePossibleValueSource.enumValues?.length; i++)
         {
            this.inlinePossibleValueSource.push(new QPossibleValue(object.inlinePossibleValueSource.enumValues[i]));
         }
      }

      this.helpContents = QHelpContent.buildArray(object.helpContents);
      this.behaviors = object.behaviors;

      if (object.supplementalFieldMetaData)
      {
         for (const key in object.supplementalFieldMetaData)
         {
            this.supplementalFieldMetaData.set(key, object.supplementalFieldMetaData[key]);
         }
      }
   }


   /*******************************************************************************
    ** test if this field has an adornment of a given type
    *******************************************************************************/
   hasAdornment(type: AdornmentType): boolean
   {
      const adornment = this.getAdornment(type);
      return (adornment !== null);
   }


   /*******************************************************************************
    ** get the adornment of a given type from this field
    *******************************************************************************/
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
