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


import {AxiosError} from "axios";

/*******************************************************************************
 ** Exception within qqq
 **
 *******************************************************************************/
export class QException
{
   message: string;
   status: string | undefined;
   code: string | undefined;

   constructor(error: AxiosError)
   {
      this.message = error.message;
      this.code = error.code;

      if(error.response !== undefined && error.response.status !== undefined)
      {
         this.status = error.response.status.toString();
      }
      else if(error.status !== undefined)
      {
         this.status = error.status;
      }

      if(error.response !== undefined && error.response.statusText !== undefined)
      {
         this.code = error.response.statusText;
      }
      else if(error.code !== undefined)
      {
         this.status = error.code;
      }
   }
}

