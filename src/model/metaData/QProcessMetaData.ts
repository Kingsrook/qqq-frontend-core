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

import {QFrontendStepMetaData} from "./QFrontendStepMetaData";

/*******************************************************************************
 ** Meta-Data to define a process in a QQQ instance.
 **
 *******************************************************************************/
export class QProcessMetaData
{
   name: string;
   label: string;
   tableName: string;
   isHidden: boolean = false;
   iconName?: string;
   frontendSteps?: QFrontendStepMetaData[];
   hasPermission: boolean = false;
   stepFlow: string;

   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.tableName = object.tableName;
      this.isHidden = object.isHidden;
      this.iconName = object.iconName;
      this.hasPermission = object.hasPermission;
      this.stepFlow = object.stepFlow;

      if (object.frontendSteps)
      {
         this.frontendSteps = [];
         for (let i = 0; i < object.frontendSteps.length; i++)
         {
            this.frontendSteps.push(
               new QFrontendStepMetaData(object.frontendSteps[i])
            );
         }
      }
   }
}
