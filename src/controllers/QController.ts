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

// export default (a: number, b: number): number => a + b;

import { QTableMetaData } from "../model/metaData/QTableMetaData";
import { QTableRecord } from "../model/metaData/QTableRecord";
import { AxiosError, AxiosResponse } from "axios";

const axios = require("axios").default;

/*******************************************************************************
 **
 *******************************************************************************/
export class QController {
  private baseUrl: string;

  /*******************************************************************************
   **
   *******************************************************************************/
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /*******************************************************************************
   **
   *******************************************************************************/
  async loadMetaData(): Promise<Map<string, QTableMetaData>> {
    return await new Promise((resolve, reject) => {
      axios
        .get(this.baseUrl + "/metaData")
        .then((response: AxiosResponse) => {
          console.log(response);

          // const table = new QTableMetaData('episode');

          const tables = new Map();
          for (const tableName in response.data.tables) {
            tables.set(tableName, response.data.tables[tableName]);
          }

          resolve(tables);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          reject(error.message);
        });
    });
  }

  /*******************************************************************************
   **
   *******************************************************************************/
  async loadTableMetaData(tableName: String): Promise<QTableMetaData> {
    return await new Promise((resolve, reject) => {
      axios
        .get(this.baseUrl + "/metaData/" + tableName)
        .then((response: AxiosResponse) => {
          console.log(response);
          resolve(response.data.table);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          reject(error.message);
        });
    });
  }

  /*******************************************************************************
   **
   *******************************************************************************/
  async create(tableName: String, data: {}): Promise<QTableRecord[]> {
    return await new Promise((resolve, reject) => {
      axios
        .post(this.baseUrl + "/data/" + tableName, data)
        .then((response: AxiosResponse) => {
          console.log(response);
          resolve(response.data.records); // create results
        })
        .catch((error: AxiosError) => {
          console.log(error);
          reject(error.message);
        });
    });
  }

  /*******************************************************************************
   **
   *******************************************************************************/
  async query(tableName: String, limit: number): Promise<QTableRecord[]> {
    let queryURL = this.baseUrl + "/data/" + tableName + "?1=1";
    if (limit != null) {
      queryURL += "&limit=" + limit;
    }

    return await new Promise((resolve, reject) => {
      axios
        .get(queryURL)
        .then((response: AxiosResponse) => {
          console.log(response);
          resolve(response.data.records); //queryResult
        })
        .catch((error: AxiosError) => {
          console.log(error);
          reject(error.message);
        });
    });
  }

  /*******************************************************************************
   **
   *******************************************************************************/
  async delete(tableName: String, id: any): Promise<QTableRecord[]> {
    return await new Promise((resolve, reject) => {
      axios
        .delete(this.baseUrl + "/data/" + tableName + "/" + id)
        .then((response: AxiosResponse) => {
          console.log(response);
          resolve(response.data.records); //queryResult
        })
        .catch((error: AxiosError) => {
          console.log(error);
          reject(error.message);
        });
    });
  }
}
