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


export type NowWithOffsetOperator = "PLUS" | "MINUS";
export type NowWithOffsetUnit = "SECONDS" | "MINUTES" | "HOURS" | "DAYS" | "WEEKS" | "MONTHS" | "YEARS";

/*******************************************************************************
 ** Define a "now with offset" type expression, as part of a criteria in a QQQ instance.
 **
 *******************************************************************************/
export class NowWithOffsetExpression
{
   operator?: NowWithOffsetOperator;
   amount?: number;
   timeUnit?: NowWithOffsetUnit;
   type: "NowWithOffset";

   constructor(object?: any)
   {
      this.operator = object?.operator;
      this.amount = object?.amount;
      this.timeUnit = object?.timeUnit;
      this.type = "NowWithOffset";
   }

   toString()
   {
      let timeUnitString = this.timeUnit?.toLowerCase() ?? "";
      if(this.amount == 1 && timeUnitString.endsWith("s"))
      {
         timeUnitString = timeUnitString.substring(0, timeUnitString.length - 1);
      }
      return `${this.amount} ${timeUnitString} ${this.operator == "PLUS" ? "from now" : "ago"}`;
   }
}
