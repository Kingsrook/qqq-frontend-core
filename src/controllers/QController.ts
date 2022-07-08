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

import { QInstance } from "../model/metaData/QInstance";
import { QProcessMetaData } from "../model/metaData/QProcessMetaData";
import { QRecord } from "../model/QRecord";
import { QTableMetaData } from "../model/metaData/QTableMetaData";

import { QJobStarted } from "../model/processes/QJobStarted";
import { QJobComplete } from "../model/processes/QJobComplete";
import { QJobError } from "../model/processes/QJobError";
import { QJobRunning } from "../model/processes/QJobRunning";

import { AxiosError, AxiosResponse } from "axios";

const axios = require("axios").default;

const throwError = (response: AxiosError) => {
  throw response;
};

/*******************************************************************************
 ** Controller for interacting with a QQQ backend.
 *******************************************************************************/
export class QController {
  private axiosInstance;

  /*******************************************************************************
   **
   *******************************************************************************/
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 15000, // todo - evaulate this!
    });
  }

  /*******************************************************************************
   ** Fetch the top-level meta data for a qqq instance.
   *******************************************************************************/
  async loadMetaData(): Promise<QInstance> {
    return this.axiosInstance
      .get(`/metaData/`)
      .then((response: AxiosResponse) => {
        return new QInstance(response.data);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Fetch the full meta data for a specific table.
   *******************************************************************************/
  async loadTableMetaData(tableName: string): Promise<QTableMetaData> {
    return this.axiosInstance
      .get(`/metaData/table/${tableName}`)
      .then((response: AxiosResponse) => {
        return new QTableMetaData(response.data.table);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Fetch the full meta data for a specific process.
   *******************************************************************************/
  async loadProcessMetaData(tableName: string): Promise<QProcessMetaData> {
    return this.axiosInstance
      .get(`/metaData/process/${tableName}`)
      .then((response: AxiosResponse) => {
        return new QProcessMetaData(response.data.process);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a count request to the backend
   *******************************************************************************/
  async count(tableName: string): Promise<number> {
    let countURL = `/data/${tableName}/count`;

    console.log(`COUNTURL: ${countURL}`);

    return this.axiosInstance
      .get(countURL)
      .then((response: AxiosResponse) => {
        return response.data.count;
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a query request to the backend
   *******************************************************************************/
  async query(
    tableName: string,
    limit: number,
    skip: number
  ): Promise<QRecord[]> {
    let queryURL = `/data/${tableName}?1=1`;
    queryURL += limit ? `&limit=${limit}` : "";
    queryURL += skip ? `&skip=${skip}` : "";

    return this.axiosInstance
      .get(queryURL)
      .then((response: AxiosResponse) => {
        const records: QRecord[] = [];
        if (response.data.records) {
          for (let i = 0; i < response.data.records.length; i++) {
            records.push(new QRecord(response.data.records[i]));
          }
        }
        return records;
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a request to the backend for a single record
   *******************************************************************************/
  async get(tableName: string, primaryKey: any): Promise<QRecord> {
    let getURL = `/data/${tableName}/${primaryKey}`;
    return this.axiosInstance
      .get(getURL)
      .then((response: AxiosResponse) => {
        return new QRecord(response.data);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a backend call to create a single record
   ** TODO - bulk - despite being same on backend, feels like could or should be
   **  different in here?  maybe not, but needs figured out.
   *******************************************************************************/
  async create(tableName: string, data: {}): Promise<QRecord> {
    return this.axiosInstance
      .post(`/data/${tableName}`, data)
      .then((response: AxiosResponse) => {
        return new QRecord(response.data.records[0]);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a backend call to update a single record
   ** TODO - bulk - despite being same on backend, feels like could or should be
   **  different in here?  maybe not, but needs figured out.
   *******************************************************************************/
  async update(tableName: string, id: any, data: {}): Promise<QRecord> {
    return this.axiosInstance
      .put(`/data/${tableName}/${id}`, data)
      .then((response: AxiosResponse) => {
        return new QRecord(response.data.records[0]);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Make a backend call to delete a single record
   ** TODO - bulk - despite being same on backend, feels like could or should be
   **  different in here?  maybe not, but needs figured out.
   *******************************************************************************/
  async delete(tableName: string, id: any): Promise<QRecord> {
    return this.axiosInstance
      .delete(`/data/${tableName}/${id}`)
      .then((response: AxiosResponse) => {
        return new QRecord(response.data.records[0]);
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Common logic to parse a process-related server response into an appropriate object.
   *******************************************************************************/
  parseProcessResponse(
    response: AxiosResponse
  ): QJobStarted | QJobRunning | QJobComplete | QJobError {
    //////////////////////////////////////////////////////////////////////////////////////
    // so, the order of these checks is critical (mostly because, complete & error have //
    // a jobStatus with them too, so, you can't check that one too soon                 //
    //////////////////////////////////////////////////////////////////////////////////////
    if (response.data.jobUUID) {
      return new QJobStarted(response.data);
    } else if (response.data.values || response.data.nextStep) {
      return new QJobComplete(response.data);
    } else if (response.data.error) {
      return new QJobError(response.data);
    } else if (response.data.jobStatus) {
      return new QJobRunning(response.data.jobStatus);
    } else {
      return new QJobError({ error: "Unexpected server response." });
    }
  }

  /*******************************************************************************
   ** Initialize a process
   *******************************************************************************/
  async processInit(
    processName: string,
    queryString: string = ""
  ): Promise<QJobStarted | QJobComplete | QJobError> {
    let url = `/processes/${processName}/init`;
    if (queryString !== "") {
      url += `?${queryString}`;
    }
    return this.axiosInstance
      .post(url)
      .then((response: AxiosResponse) => {
        const responseObject = this.parseProcessResponse(response);
        if (responseObject instanceof QJobRunning) {
          ////////////////////////////////////////////////////////////////////
          // we aren't allowed to return "Running" here, so just in case... //
          ////////////////////////////////////////////////////////////////////
          return new QJobError({ error: "Unexpected server response." });
        }
        return responseObject;
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Proceed to the next step in a process
   *******************************************************************************/
  async processStep(
    processName: string,
    processUUID: string,
    step: string,
    queryString: string = ""
  ): Promise<QJobStarted | QJobComplete | QJobError> {
    let url = `/processes/${processName}/${processUUID}/step/${step}`;
    if (queryString !== "") {
      url += `?${queryString}`;
    }
    return this.axiosInstance
      .post(url)
      .then((response: AxiosResponse) => {
        const responseObject = this.parseProcessResponse(response);
        if (responseObject instanceof QJobRunning) {
          ////////////////////////////////////////////////////////////////////
          // we aren't allowed to return "Running" here, so just in case... //
          ////////////////////////////////////////////////////////////////////
          return new QJobError({ error: "Unexpected server response." });
        }
        return responseObject;
      })
      .catch(throwError);
  }

  /*******************************************************************************
   ** Get the status for a currently executing job within a process (init or step)
   *******************************************************************************/
  async processJobStatus(
    processName: string,
    processUUID: string,
    jobUUID: string
  ): Promise<QJobRunning | QJobComplete | QJobError> {
    return this.axiosInstance
      .get(`/processes/${processName}/${processUUID}/status/${jobUUID}`)
      .then((response: AxiosResponse) => {
        const responseObject = this.parseProcessResponse(response);
        if (responseObject instanceof QJobStarted) {
          ////////////////////////////////////////////////////////////////////
          // we aren't allowed to return "Started" here, so just in case... //
          ////////////////////////////////////////////////////////////////////
          return new QJobError({ error: "Unexpected server response." });
        }
        return responseObject;
      })
      .catch(throwError);
  }
}
