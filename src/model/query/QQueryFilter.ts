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

import {QFilterCriteria} from "./QFilterCriteria";
import {QFilterOrderBy} from "./QFilterOrderBy";

/*******************************************************************************
 ** Define a filter in a QQQ instance.
 **
 *******************************************************************************/
export class QQueryFilter
{
   criteria?: QFilterCriteria[];
   orderBys?: QFilterOrderBy[];
   subFilters?: QQueryFilter[];
   booleanOperator: "AND" | "OR";
   skip?: number;
   limit?: number;

   constructor(criteria?: QFilterCriteria[], orderBys?: QFilterOrderBy[], subFilters?: QQueryFilter[], booleanOperator: "AND" | "OR" = "AND", skip?: number, limit?: number)
   {
      this.criteria = criteria;
      this.orderBys = orderBys;
      this.subFilters = subFilters;
      this.booleanOperator = booleanOperator;
      this.skip = skip;
      this.limit = limit;
   }

   public addOrderBy(orderBy: QFilterOrderBy)
   {
      if (!this.orderBys)
      {
         this.orderBys = [] as QFilterOrderBy[];
      }
      this.orderBys.push(orderBy);
   }

   public addCriteria(criteria: QFilterCriteria)
   {
      if (!this.criteria)
      {
         this.criteria = [] as QFilterCriteria[];
      }
      this.criteria.push(criteria);
   }

   public addSubFilter(subFilter: QQueryFilter)
   {
      if (!this.subFilters)
      {
         this.subFilters = [] as QQueryFilter[];
      }
      this.subFilters.push(subFilter);
   }
}
