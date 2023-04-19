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
 ** Meta-Data to define a widget in a QQQ instance.
 **
 *******************************************************************************/
export class QWidgetMetaData
{
   name: string;
   label: string;
   type: string;
   icon?: string;
   isCard?: boolean;
   minHeight?: string;
   gridColumns?: number;
   footerHTML?: string;
   hasPermission: boolean = false;
   storeDropdownSelections?: boolean;
   dropdowns?: [{
      possibleValueSourceName?: string,
      isRequired: boolean
   }];

   constructor(object: any)
   {
      this.name = object.name;
      this.label = object.label;
      this.type = object.type;
      this.icon = object.icon;
      this.isCard = object.isCard;
      this.minHeight = object.minHeight;
      this.gridColumns = object.gridColumns;
      this.footerHTML = object.footerHTML;
      this.hasPermission = object.hasPermission;
      this.storeDropdownSelections = object.storeDropdownSelections;
      this.dropdowns = object.dropdowns;
   }
}
