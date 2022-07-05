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

import {QTableMetaData} from "../model/metaData/QTableMetaData";
import {QRecord} from "../model/QRecord";
import {AxiosError, AxiosResponse} from "axios";
import {QInstance} from "../model/metaData/QInstance";

const axios = require("axios").default;

const throwError = (response: AxiosError) => {
    throw (response);
}

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
        return this.axiosInstance.get(`/metaData/`)
            .then((response: AxiosResponse) => {
                return (new QInstance(response.data));
            })
            .catch(throwError);
    }


    /*******************************************************************************
     ** Fetch the full meta data for a specific table.
     *******************************************************************************/
    async loadTableMetaData(tableName: string): Promise<QTableMetaData> {
        return this.axiosInstance.get(`/metaData/${tableName}`)
            .then((response: AxiosResponse) => {
                return (new QTableMetaData(response.data.table));
            })
            .catch(throwError);
    }

    /*******************************************************************************
     ** Make a query request to the backend
     *******************************************************************************/
    async query(tableName: string, limit: number): Promise<QRecord[]> {
        let queryURL = `/data/${tableName}?1=1`;
        if (limit != null) {
            queryURL += `&limit=${limit}`;
        }

        return this.axiosInstance.get(queryURL)
            .then((response: AxiosResponse) => {
                const records: QRecord[] = [];
                for (let i = 0; i < response.data.records.length; i++) {
                    records.push(new QRecord(response.data.records[i]));
                }
                return (records);
            })
            .catch(throwError);
    }

    /*******************************************************************************
     ** Make a backend call to create a single record
     ** TODO - bulk - despite being same on backend, feels like could or should be
     **  different in here?  maybe not, but needs figured out.
     *******************************************************************************/
    async create(tableName: string, data: {}): Promise<QRecord> {
        return this.axiosInstance.post(`/data/${tableName}`, data)
            .then((response: AxiosResponse) => {
                return new QRecord(response.data.records[0])
            })
            .catch(throwError);
    }

    /*******************************************************************************
     ** Make a backend call to update a single record
     ** TODO - bulk - despite being same on backend, feels like could or should be
     **  different in here?  maybe not, but needs figured out.
     *******************************************************************************/
    async update(tableName: string, id: any, data: {}): Promise<QRecord> {
        return this.axiosInstance.put(`/data/${tableName}/${id}`, data)
            .then((response: AxiosResponse) => {
                return new QRecord(response.data.records[0])
            })
            .catch(throwError);
    }

    /*******************************************************************************
     ** Make a backend call to delete a single record
     ** TODO - bulk - despite being same on backend, feels like could or should be
     **  different in here?  maybe not, but needs figured out.
     *******************************************************************************/
    async delete(tableName: string, id: any): Promise<QRecord> {
        return this.axiosInstance.delete(`/data/${tableName}/${id}`)
            .then((response: AxiosResponse) => {
                return new QRecord(response.data.records[0])
            })
            .catch(throwError);
    }

}