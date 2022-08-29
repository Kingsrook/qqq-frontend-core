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

import {QTableMetaData} from "./QTableMetaData";
import {QProcessMetaData} from "./QProcessMetaData";
import {QAppMetaData} from "./QAppMetaData";
import {QAppTreeNode} from "./QAppTreeNode";
import {QAppNodeType} from "./QAppNodeType";

/*******************************************************************************
 ** Meta-Data definition of a QQQ Instance
 **
 *******************************************************************************/
export class QInstance
{
   tables?: Map<string, QTableMetaData>;
   processes?: Map<string, QProcessMetaData>;
   apps?: Map<string, QAppMetaData>;
   appTree?: QAppTreeNode[];

   constructor(object: any)
   {
      if (object.tables)
      {
         this.tables = new Map<string, QTableMetaData>();
         for (const key in object.tables)
         {
            this.tables.set(key, new QTableMetaData(object.tables[key]))
         }
      }

      if (object.processes)
      {
         this.processes = new Map<string, QProcessMetaData>();
         for (const key in object.processes)
         {
            this.processes.set(key, new QProcessMetaData(object.processes[key]))
         }
      }

      if (object.apps)
      {
         this.apps = new Map<string, QAppMetaData>();
         for (const key in object.apps)
         {
            this.apps.set(key, new QAppMetaData(object.apps[key]))
         }
      }

      if (object.appTree)
      {
         this.appTree = [];
         for (let i = 0; i < object.appTree.length; i++)
         {
            this.appTree.push(new QAppTreeNode(object.appTree[i]))
         }
      }
   }


   /*******************************************************************************
    ** Get the full path to a table
    *******************************************************************************/
   getTablePath(table: QTableMetaData): string | null
   {
      return QInstance.searchAppTree(this.appTree, table, "");
   }

   /*******************************************************************************
    **
    *******************************************************************************/
   private static searchAppTree(nodes: QAppTreeNode[] | undefined, table: QTableMetaData, path: string): string | null
   {
      if (nodes === undefined)
      {
         return (null);
      }

      for (let i = 0; i < nodes.length; i++)
      {
         if (nodes[i].type === QAppNodeType.TABLE && nodes[i].name === table.name)
         {
            return (`${path}/${table.name}`);
         }
         else if (nodes[i].type === QAppNodeType.APP)
         {
            const result = this.searchAppTree(nodes[i].children, table, `${path}/${nodes[i].name}`);
            if (result !== null)
            {
               return (result);
            }
         }
      }
      return (null);
   }

}
