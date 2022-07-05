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

import {QController} from "../../src/controllers/QController";
import {QInstance} from "../../src/model/metaData/QInstance";
import {QTableMetaData} from "../../src/model/metaData/QTableMetaData";
import {QFieldMetaData} from "../../src/model/metaData/QFieldMetaData";
import {QFieldType} from "../../src/model/metaData/QFieldType";
import {QRecord} from "../../src/model/QRecord";
import {AxiosError} from "axios";
import {QProcessMetaData} from "../../src/model/metaData/QProcessMetaData";

const baseURL = "http://localhost:8000";

describe("q controller test", () => {

    it("should return meta data", async () => {
        const qController = new QController(baseURL);
        const metaData = await qController.loadMetaData();
        expect(metaData).toBeInstanceOf(QInstance);

        const tables = metaData.tables;
        expect(tables?.size).toBeGreaterThan(1)
        const personTable = tables?.get("person");
        expect(personTable).toBeInstanceOf(QTableMetaData);
        expect(personTable?.label).toBe("Person");
        const fields = personTable?.fields;
        expect(fields).toBeUndefined(); // this meta data does not go down to the field level!

        const processes = metaData.processes;
        expect(processes?.size).toBeGreaterThan(0)
        const greetProcess = processes?.get("greet");
        expect(greetProcess).toBeInstanceOf(QProcessMetaData);
        expect(greetProcess?.label).toBe("Greet People");
    });

    it("should return an error with a bad base url meta data", async () => {
        try {
            const qController = new QController("http://notahost:123");
            const metaData = await qController.loadMetaData();
            expect(metaData).toBeNull()
        } catch (error) {
            expect(error).toBeInstanceOf(AxiosError)
        }
    });

    it("should return table meta data without promise", async () => {
        const qController = new QController(baseURL);

        const tableMetaData = await qController.loadTableMetaData("carrier");
        expect(tableMetaData).toBeInstanceOf(QTableMetaData);
        expect(tableMetaData.fields).toBeInstanceOf(Map)
        expect(tableMetaData?.label).toBe("Carrier");

        const nameField = tableMetaData?.fields?.get("name");
        expect(nameField).toBeInstanceOf(QFieldMetaData);
        expect(nameField?.name).toBe("name");
        expect(nameField?.label).toBe("Name");
        expect(nameField?.type).toBe(QFieldType.STRING);
    });

    it("should fail table meta data for bad table name without promise", async () => {
        try {
            const qController = new QController(baseURL);
            const tableMetaData = await qController.loadTableMetaData("currier");
            expect(tableMetaData).toBeNull()
        } catch (error) {
            expect(error).toBeInstanceOf(AxiosError)
        }
    });

    it("should create a record", async () => {
        const qController = new QController(baseURL);
        let data = {firstName: "John", lastName: "Doe", email: "jdoe@kingsrook.com"};
        const personRecord: QRecord = await qController.create("person", data);
        expect(personRecord).toBeInstanceOf(QRecord);
        expect(personRecord.values.get("firstName")).toBe("John")
    });

    it("should update a record", async () => {
        const qController = new QController(baseURL);
        let data = {firstName: "John", lastName: "Doe", email: "jdoe@kingsrook.com"};
        const personRecord: QRecord = await qController.update("person", 1, data);
        expect(personRecord).toBeInstanceOf(QRecord);
        expect(personRecord.values.get("firstName")).toBe("John")
    });

    it("should query for records", async () => {
        const qController = new QController(baseURL);
        const personRecords: QRecord[] = await qController.query("person", 1);
        expect(personRecords).toBeInstanceOf(Array);
        expect(personRecords.length).toBe(1);
    });

    it("should delete a record", async () => {
        const qController = new QController(baseURL);
        const personRecord: QRecord = await qController.delete("person", 1);
        expect(personRecord).toBeInstanceOf(QRecord);
    });

});
