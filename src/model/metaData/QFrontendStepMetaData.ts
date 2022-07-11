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
 ** Meta-Data to define a step (for the frontend) in a QQQ process.
 **
 *******************************************************************************/
export class QFrontendStepMetaData {
  name: string;
  label: string;
  formFields?: QFieldMetaData[];
  viewFields?: QFieldMetaData[];
  recordListFields?: QFieldMetaData[];

  constructor(object: any) {
    this.name = object.name;
    this.label = object.label;

    if (object.formFields) {
      this.formFields = [];
      for (let i = 0; i < object.formFields.length; i++)
        this.formFields.push(new QFieldMetaData(object.formFields[i]));
    }

    if (object.viewFields) {
      this.viewFields = [];
      for (let i = 0; i < object.viewFields.length; i++)
        this.viewFields.push(new QFieldMetaData(object.viewFields[i]));
    }

    if (object.recordListFields) {
      this.recordListFields = [];
      for (let i = 0; i < object.recordListFields.length; i++)
        this.recordListFields.push(
          new QFieldMetaData(object.recordListFields[i])
        );
    }
  }
}
