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

import {AxiosError, AxiosResponse} from "axios";
import FormData from "form-data";
import {QException} from "../exceptions/QException";
import {QInstance} from "../model/metaData/QInstance";
import {QProcessMetaData} from "../model/metaData/QProcessMetaData";
import {QTableMetaData} from "../model/metaData/QTableMetaData";
import {QJobComplete} from "../model/processes/QJobComplete";
import {QJobError} from "../model/processes/QJobError";
import {QJobRunning} from "../model/processes/QJobRunning";
import {QJobStarted} from "../model/processes/QJobStarted";
import {QPossibleValue} from "../model/QPossibleValue";
import {QRecord} from "../model/QRecord";
import {QQueryFilter} from "../model/query/QQueryFilter";
const axios = require("axios").default;

/*******************************************************************************
 ** Controller for interacting with a QQQ backend.
 *******************************************************************************/
export class QController
{
   private axiosInstance;
   private exceptionHandler;


   /*******************************************************************************
    **
    *******************************************************************************/
   constructor(baseUrl: string, exceptionHandler?: (error: QException) => any)
   {
      this.axiosInstance = axios.create({
         baseURL: baseUrl,
         timeout: 60000, // todo - evaulate this!
      });

      if (exceptionHandler != null)
      {
         this.exceptionHandler = exceptionHandler;
      }
      else
      {
         this.exceptionHandler = (error: QException) =>
         {
            throw error;
         };
      }
   }

   /*******************************************************************************
    ** Fetch the top-level meta data for a qqq instance.
    *******************************************************************************/
   async loadMetaData(): Promise<QInstance>
   {
      return this.axiosInstance
         .get("/metaData/")
         .then((response: AxiosResponse) =>
         {
            return new QInstance(response.data);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Fetch the full meta data for a specific table.
    *******************************************************************************/
   async loadTableMetaData(tableName: string): Promise<QTableMetaData>
   {
      return this.axiosInstance
         .get(`/metaData/table/${tableName}`)
         .then((response: AxiosResponse) =>
         {
            return new QTableMetaData(response.data.table);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Fetch the full meta data for a specific process.
    *******************************************************************************/
   async loadProcessMetaData(tableName: string): Promise<QProcessMetaData>
   {
      return this.axiosInstance
         .get(`/metaData/process/${tableName}`)
         .then((response: AxiosResponse) =>
         {
            return new QProcessMetaData(response.data.process);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a count request to the backend
    *******************************************************************************/
   async count(tableName: string, queryFilter?: QQueryFilter): Promise<number>
   {
      let countURL = `/data/${tableName}/count`;

      const formData = new FormData();
      if (queryFilter)
      {
         formData.append("filter", JSON.stringify(queryFilter));
      }

      return this.axiosInstance
         .post(countURL, formData)
         .then((response: AxiosResponse) =>
         {
            return response.data.count;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a query request to the backend
    *******************************************************************************/
   async query(
      tableName: string,
      queryFilter?: QQueryFilter,
      limit?: number,
      skip?: number
   ): Promise<QRecord[]>
   {
      let queryURL = `/data/${tableName}/query`;
      const queryParts = [];
      if (limit)
      {
         queryParts.push(`limit=${limit}`);
      }
      if (skip)
      {
         queryParts.push(`skip=${skip}`);
      }
      if (queryParts.length > 0)
      {
         queryURL += `?${queryParts.join("&")}`;
      }

      const formData = new FormData();
      if (queryFilter)
      {
         formData.append("filter", JSON.stringify(queryFilter));
      }

      return this.axiosInstance
         .post(queryURL, formData)
         .then((response: AxiosResponse) =>
         {
            const records: QRecord[] = [];
            if (response.data.records)
            {
               for (let i = 0; i < response.data.records.length; i++)
               {
                  records.push(new QRecord(response.data.records[i]));
               }
            }
            return records;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a request to the backend for a single record
    *******************************************************************************/
   async get(tableName: string, primaryKey: any): Promise<QRecord>
   {
      let getURL = `/data/${tableName}/${primaryKey}`;
      return this.axiosInstance
         .get(getURL)
         .then((response: AxiosResponse) =>
         {
            return new QRecord(response.data);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a request to the backend for a single record's developer mode data
    *******************************************************************************/
   async getRecordDeveloperMode(tableName: string, primaryKey: any): Promise<any>
   {
      let getURL = `/data/${tableName}/${primaryKey}/developer`;
      return this.axiosInstance
         .get(getURL)
         .then((response: AxiosResponse) =>
         {
            return response.data;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a request to the backend to save a new version of a record's associated script
    *******************************************************************************/
   async storeRecordAssociatedScript(tableName: string, primaryKey: any, fieldName: string, code: string, commitMessage: string): Promise<any>
   {
      let url = `/data/${tableName}/${primaryKey}/developer/associatedScript/${fieldName}`;

      const formData = new FormData();
      formData.append("contents", code);
      formData.append("commitMessage", commitMessage);

      return this.axiosInstance
         .post(url, formData)
         .then((response: AxiosResponse) =>
         {
            return response.data;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a request to the backend to get script logs for an associated script
    *******************************************************************************/
   async getRecordAssociatedScriptLogs(tableName: string, primaryKey: any, fieldName: string, scriptRevisionId: number): Promise<any>
   {
      let url = `/data/${tableName}/${primaryKey}/developer/associatedScript/${fieldName}/${scriptRevisionId}/logs`;

      return this.axiosInstance
         .get(url)
         .then((response: AxiosResponse) =>
         {
            return response.data;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a backend call to create a single record
    **
    *******************************************************************************/
   async create(tableName: string, data: {}): Promise<QRecord>
   {
      return this.axiosInstance
         .post(`/data/${tableName}`, data)
         .then((response: AxiosResponse) =>
         {
            return new QRecord(response.data.records[0]);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a backend call to update a single record
    **
    *******************************************************************************/
   async update(tableName: string, id: any, data: {}): Promise<QRecord>
   {
      return this.axiosInstance
         .put(`/data/${tableName}/${id}`, data)
         .then((response: AxiosResponse) =>
         {
            return new QRecord(response.data.records[0]);
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Make a backend call to delete a single record
    **
    *******************************************************************************/
   async delete(tableName: string, id: any): Promise<number>
   {
      return this.axiosInstance
         .delete(`/data/${tableName}/${id}`)
         .then((response: AxiosResponse) =>
         {
            if (response.data.deletedRecordCount === 1)
            {
               return (1);
            }
            else
            {
               const error = response.data?.recordsWithErrors[0]?.errors[0];
               if (error)
               {
                  throw (new Error(error));
               }
               throw (new Error("Unknown error deleting record."));
            }
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Common logic to parse a process-related server response into an appropriate object.
    *******************************************************************************/
   parseProcessResponse(
      response: AxiosResponse
   ): QJobStarted | QJobRunning | QJobComplete | QJobError
   {
      //////////////////////////////////////////////////////////////////////////////////////
      // so, the order of these checks is critical (mostly because, complete & error have //
      // a jobStatus with them too, so, you can't check that one too soon                 //
      //////////////////////////////////////////////////////////////////////////////////////
      if (response.data.jobUUID)
      {
         return new QJobStarted(response.data);
      }
      else if (response.data.values || response.data.nextStep)
      {
         return new QJobComplete(response.data);
      }
      else if (response.data.error)
      {
         return new QJobError(response.data);
      }
      else if (response.data.jobStatus)
      {
         return new QJobRunning(response.data.jobStatus);
      }
      else
      {
         return new QJobError({error: "Unexpected server response."});
      }
   }

   /*******************************************************************************
    ** Initialize a process
    *******************************************************************************/
   async processInit(processName: string, queryString: string = ""): Promise<QJobStarted | QJobComplete | QJobError>
   {
      let url = `/processes/${processName}/init`;
      return this.postWithQueryStringToPossibleAsyncBackendJob(queryString, url);
   }

   /*******************************************************************************
    ** Helper function for the process init & step functions, as well as bulk functions
    ** which may run async.
    *******************************************************************************/
   private postWithQueryStringToPossibleAsyncBackendJob(queryString: string, url: string)
   {
      if (queryString && queryString !== "")
      {
         url += `?${queryString}`;
      }
      return this.axiosInstance
         .post(url)
         .then((response: AxiosResponse) =>
         {
            const responseObject = this.parseProcessResponse(response);
            if (responseObject instanceof QJobRunning)
            {
               ////////////////////////////////////////////////////////////////////
               // we aren't allowed to return "Running" here, so just in case... //
               ////////////////////////////////////////////////////////////////////
               return new QJobError({error: "Unexpected server response."});
            }
            return responseObject;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Proceed to the next step in a process
    *******************************************************************************/
   async processStep(
      processName: string,
      processUUID: string,
      step: string,
      formData: string | FormData = "",
      formDataHeaders?: FormData.Headers
   ): Promise<QJobStarted | QJobComplete | QJobError>
   {
      let url = `/processes/${processName}/${processUUID}/step/${step}`;
      if (formData instanceof FormData)
      {
         if (!formDataHeaders)
         {
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            // so, it looks like FormData is supplied by the browser, when running the browser, but by a form-data //
            // lib when running not in the browser.  The browser version doesn't have a getHeaders method...       //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            formDataHeaders = formData.getHeaders();
         }

         return this.axiosInstance
            .post(url, formData, {headers: formDataHeaders})
            .then((response: AxiosResponse) =>
            {
               const responseObject = this.parseProcessResponse(response);
               if (responseObject instanceof QJobRunning)
               {
                  ////////////////////////////////////////////////////////////////////
                  // we aren't allowed to return "Running" here, so just in case... //
                  ////////////////////////////////////////////////////////////////////
                  return new QJobError({error: "Unexpected server response."});
               }
               return responseObject;
            })
            .catch((error: AxiosError) =>
            {
               this.handleException(error);
            });
      }
      else
      {
         return this.postWithQueryStringToPossibleAsyncBackendJob(formData, url);
      }
   }

   /*******************************************************************************
    ** Get the status for a currently executing job within a process (init or step)
    *******************************************************************************/
   async processJobStatus(
      processName: string,
      processUUID: string,
      jobUUID: string
   ): Promise<QJobRunning | QJobComplete | QJobError>
   {
      return this.axiosInstance
         .get(`/processes/${processName}/${processUUID}/status/${jobUUID}`)
         .then((response: AxiosResponse) =>
         {
            const responseObject = this.parseProcessResponse(response);
            if (responseObject instanceof QJobStarted)
            {
               ////////////////////////////////////////////////////////////////////
               // we aren't allowed to return "Started" here, so just in case... //
               ////////////////////////////////////////////////////////////////////
               return new QJobError({error: "Unexpected server response."});
            }
            return responseObject;
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }

   /*******************************************************************************
    ** Get records from a process's state
    *******************************************************************************/
   async processRecords(
      processName: string,
      processUUID: string,
      skip: number = 0,
      limit: number = 20
   ): Promise<{ totalRecords: number, records: QRecord[] }>
   {
      return this.axiosInstance
         .get(
            `/processes/${processName}/${processUUID}/records?skip=${skip}&limit=${limit}`
         )
         .then((response: AxiosResponse) =>
         {
            const records: QRecord[] = [];
            for (let i = 0; i < response.data.records.length; i++)
            {
               records.push(new QRecord(response.data.records[i]));
            }
            return {totalRecords: response.data.totalRecords, records: records};
         })
         .catch((error: AxiosError) =>
         {
            this.handleException(error);
         });
   }


   /*******************************************************************************
    ** Fetch the data for a specific widget.
    *******************************************************************************/
   async widget(widgetName: string, urlParams?: string): Promise<any>
   {
      let url = `/widget/${widgetName}`;
      if (urlParams)
      {
         url += `?${urlParams}`;
      }

      return this.axiosInstance
         .get(url)
         .then((response: AxiosResponse) =>
         {
            return response.data;
         })
         .catch(this.handleException);
   }


   /*******************************************************************************
    ** Fetch options for a possible-value drop down
    *******************************************************************************/
   async possibleValues(tableName: string, fieldName: string, searchTerm: string = "", ids: any[] = []): Promise<QPossibleValue[]>
   {
      let url = `/data/${tableName}/possibleValues/${fieldName}`;

      let queryComponents = [];

      if (searchTerm !== "")
      {
         queryComponents.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
      }

      if (ids && ids.length)
      {
         queryComponents.push(`ids=${encodeURIComponent(ids.join(","))}`);
      }

      if (queryComponents.length > 0)
      {
         url += `?${queryComponents.join("&")}`;
      }

      return this.axiosInstance
         .get(url)
         .then((response: AxiosResponse) =>
         {
            const results: QPossibleValue[] = [];
            if (response.data && response.data.options)
            {
               for (let i = 0; i < response.data.options.length; i++)
               {
                  results.push(new QPossibleValue(response.data.options[i]));
               }
            }
            return results;
         })
         .catch(this.handleException);
   }


   /*******************************************************************************
    ** exception handler which will marshal axios error into a Qexception and
    *  send that the exception handler provided to this class
    *******************************************************************************/
   private handleException(error: AxiosError): void
   {
      const qException = new QException(error);
      this.exceptionHandler(qException);
   }
}
