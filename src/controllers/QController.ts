/*
 * Copyright © 2021-2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

// export default (a: number, b: number): number => a + b;

import {QTableMetaData} from '../model/metaData/QTableMetaData';
import {AxiosError, AxiosResponse} from 'axios';

const axios = require('axios').default;

/*******************************************************************************
 **
 *******************************************************************************/
export class QController
{
   private baseUrl: string

   /*******************************************************************************
    **
    *******************************************************************************/
   constructor(baseUrl: string)
   {
      this.baseUrl = baseUrl;
   }

   /*******************************************************************************
    **
    *******************************************************************************/
   async loadMetaData(): Promise<Map<string, QTableMetaData>>
   {
      return await new Promise((resolve, reject) =>
      {
         axios.get(this.baseUrl + "/metaData")
             .then((response: AxiosResponse) =>
             {
                console.log(response);

                // const table = new QTableMetaData('episode');

                const tables = new Map();
                for (const tableName in response.data.tables)
                {
                   tables.set(tableName, response.data.tables[tableName]);
                }

                resolve(tables);
             })
             .catch((error: AxiosError) =>
             {
                console.log(error);
                reject(error.message);
             })
      });
   }

   /*******************************************************************************
    **
    *******************************************************************************/
   async loadTableMetaData(tableName: String): Promise<QTableMetaData>
   {
      return await new Promise((resolve, reject) =>
      {
         axios.get(this.baseUrl + "/metaData/" + tableName)
            .then((response: AxiosResponse) =>
            {
               console.log(response);
               resolve(response.data.table);
            })
            .catch((error: AxiosError) =>
            {
               console.log(error);
               reject(error.message);
            })
      });
   }


   /*******************************************************************************
    **
    *******************************************************************************/
   async query(tableName: String): Promise<QTableMetaData>
   {
      return await new Promise((resolve, reject) =>
      {
         axios.get(this.baseUrl + "/data/" + tableName)
             .then((response: AxiosResponse) =>
             {
                console.log(response);
                resolve(response.data); //queryResult
             })
             .catch((error: AxiosError) =>
             {
                console.log(error);
                reject(error.message);
             })
      });
   }
}
