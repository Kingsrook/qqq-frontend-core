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

import { QController } from "../../src/controllers/QController";
import { QFieldMetaData } from "../../src/model/metaData/QFieldMetaData";
import { QFieldType } from "../../src/model/metaData/QFieldType";
import { QFrontendStepMetaData } from "../../src/model/metaData/QFrontendStepMetaData";
import { QInstance } from "../../src/model/metaData/QInstance";
import { QProcessMetaData } from "../../src/model/metaData/QProcessMetaData";
import { QRecord } from "../../src/model/QRecord";
import { QTableMetaData } from "../../src/model/metaData/QTableMetaData";

import { QJobStarted } from "../../src/model/processes/QJobStarted";
import { QJobRunning } from "../../src/model/processes/QJobRunning";
import { QJobComplete } from "../../src/model/processes/QJobComplete";
import { QJobError } from "../../src/model/processes/QJobError";

import AxiosError from "axios";

const baseURL = "http://localhost:8000";

describe("q controller test", () => {
  const qController = new QController(baseURL);

  it("should return meta data", async () => {
    const metaData = await qController.loadMetaData();
    expect(metaData).toBeInstanceOf(QInstance);

    const tables = metaData.tables;
    expect(tables?.size).toBeGreaterThan(1);
    const personTable = tables?.get("person");
    expect(personTable).toBeInstanceOf(QTableMetaData);
    expect(personTable?.label).toBe("Person");
    const fields = personTable?.fields;
    expect(fields).toBeUndefined(); // this meta data does not go down to the field level!

    const processes = metaData.processes;
    expect(processes?.size).toBeGreaterThan(0);
    const greetProcess = processes?.get("greet");
    expect(greetProcess).toBeInstanceOf(QProcessMetaData);
    expect(greetProcess?.label).toBe("Greet People");
  });

  it("should return an error with a bad base url meta data", async () => {
    try {
      const badQController = new QController("http://notahost:123");
      const metaData = await badQController.loadMetaData();
      expect(metaData).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });

  it("should return table meta data", async () => {
    const tableMetaData = await qController.loadTableMetaData("carrier");
    expect(tableMetaData).toBeInstanceOf(QTableMetaData);
    expect(tableMetaData.fields).toBeInstanceOf(Map);
    expect(tableMetaData?.label).toBe("Carrier");

    const nameField = tableMetaData?.fields?.get("name");
    expect(nameField).toBeInstanceOf(QFieldMetaData);
    expect(nameField?.name).toBe("name");
    expect(nameField?.label).toBe("Name");
    expect(nameField?.type).toBe(QFieldType.STRING);
  });

  it("should fail table meta data for bad table name", async () => {
    try {
      const tableMetaData = await qController.loadTableMetaData("currier");
      expect(tableMetaData).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });

  it("should return process meta data", async () => {
    const processMetaData = await qController.loadProcessMetaData(
      "greetInteractive"
    );
    expect(processMetaData).toBeInstanceOf(QProcessMetaData);
    expect(processMetaData?.label).toBe("Greet Interactive");
    expect(processMetaData?.frontendSteps).toBeInstanceOf(Array);

    const setupStep = processMetaData?.frontendSteps?.[0];
    expect(setupStep).toBeInstanceOf(QFrontendStepMetaData);
    expect(setupStep?.name).toBe("setup");
    expect(setupStep?.label).toBe("Setup");
    expect(setupStep?.formFields).toBeInstanceOf(Array);
    expect(setupStep?.formFields?.[0]).toBeInstanceOf(QFieldMetaData);
    expect(setupStep?.formFields?.[0].name).toBe("greetingPrefix");
  });

  it("should fail process meta data for bad process name", async () => {
    try {
      const processMetaData = await qController.loadProcessMetaData("gort");
      expect(processMetaData).toBeNull();
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });

  it("should create a record", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@kingsrook.com",
    };
    const personRecord: QRecord = await qController.create("person", data);
    expect(personRecord).toBeInstanceOf(QRecord);
    expect(personRecord.values.get("firstName")).toBe("John");
  });

  it("should update a record", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@kingsrook.com",
    };
    const personRecord: QRecord = await qController.update("person", 1, data);
    expect(personRecord).toBeInstanceOf(QRecord);
    expect(personRecord.values.get("firstName")).toBe("John");
  });

  it("should query for records", async () => {
    const personRecords: QRecord[] = await qController.query("person", 1);
    expect(personRecords).toBeInstanceOf(Array);
    expect(personRecords.length).toBe(1);
  });

  it("should get a single record by id", async () => {
    const personRecord: QRecord = await qController.get("person", 5);
    expect(personRecord).toBeInstanceOf(QRecord);
    expect(personRecord.values).toBeInstanceOf(Map);
    console.log(personRecord.values.get("firstName"));
    expect(personRecord.values.get("firstName")).toBeDefined();
  });

  it("should delete a record", async () => {
    const personRecord: QRecord = await qController.delete("person", 1);
    expect(personRecord).toBeInstanceOf(QRecord);
  });

  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  it("should init a process that goes async", async () => {
    let processName = "simpleSleep";
    const initResponse = await qController.processInit(
      processName,
      "_qStepTimeoutMillis=10&sleepMillis=100"
    );
    expect(initResponse).toBeInstanceOf(QJobStarted);
    const qJobStarted = initResponse as QJobStarted;

    const statusResponse1 = await qController.processJobStatus(
      processName,
      qJobStarted.processUUID,
      qJobStarted.jobUUID
    );
    expect(statusResponse1).toBeInstanceOf(QJobRunning);

    /////////////////////////////////////////
    // wait for the job to actually finish //
    /////////////////////////////////////////
    await sleep(750);

    const statusResponse2 = await qController.processJobStatus(
      processName,
      qJobStarted.processUUID,
      qJobStarted.jobUUID
    );
    expect(statusResponse2).toBeInstanceOf(QJobComplete);
  });

  it("should init a process that completes synchronously", async () => {
    let processName = "simpleSleep";
    const initResponse = await qController.processInit(
      processName,
      "_qStepTimeoutMillis=100&sleepMillis=10"
    );
    expect(initResponse).toBeInstanceOf(QJobComplete);
  });

  it("should run a step in a process that goes async", async () => {
    let processName = "sleepInteractive";
    const initResponse = await qController.processInit(processName);
    expect(initResponse).toBeInstanceOf(QJobComplete);
    const qJobComplete = initResponse as QJobComplete;

    const stepResponse = await qController.processStep(
      processName,
      qJobComplete.processUUID,
      qJobComplete.nextStep,
      "_qStepTimeoutMillis=10&sleepMillis=100"
    );
    expect(stepResponse).toBeInstanceOf(QJobStarted);
    const qJobStarted = stepResponse as QJobStarted;

    /////////////////////////////////////////
    // wait for the job to actually finish //
    /////////////////////////////////////////
    await sleep(200);
    const statusResponse = await qController.processJobStatus(
      processName,
      qJobComplete.processUUID,
      qJobStarted.jobUUID
    );
    expect(statusResponse).toBeInstanceOf(QJobComplete);
  });

  it("should run a step in a process that does NOT go async", async () => {
    let processName = "sleepInteractive";
    const initResponse = await qController.processInit(processName);
    expect(initResponse).toBeInstanceOf(QJobComplete);
    const qJobComplete = initResponse as QJobComplete;

    const stepResponse = await qController.processStep(
      processName,
      qJobComplete.processUUID,
      qJobComplete.nextStep,
      "_qStepTimeoutMillis=100&sleepMillis=10"
    );
    expect(stepResponse).toBeInstanceOf(QJobComplete);
    const qJobComplete2 = stepResponse as QJobComplete;

    ///////////////////////////////////////////////////
    // assert that we got back a different next-step //
    ///////////////////////////////////////////////////
    expect(qJobComplete.nextStep).not.toBe(qJobComplete2.nextStep);
  });

  it("should handle an exception from an init", async () => {
    let processName = "simpleThrow";
    const initResponse = await qController.processInit(
      processName,
      "_qStepTimeoutMillis=100&sleepMillis=10"
    );
    expect(initResponse).toBeInstanceOf(QJobError);
  });

  it("should handle an exception from an async init", async () => {
    let processName = "simpleThrow";
    const initResponse = await qController.processInit(
      processName,
      "_qStepTimeoutMillis=10&sleepMillis=100"
    );
    expect(initResponse).toBeInstanceOf(QJobStarted);
    const qJobStarted = initResponse as QJobStarted;

    await sleep(200);
    const statusResponse = await qController.processJobStatus(
      processName,
      qJobStarted.processUUID,
      qJobStarted.jobUUID
    );
    expect(statusResponse).toBeInstanceOf(QJobError);
  });

  it("should return process records", async () => {
    let processName = "greet";
    const initResponse = await qController.processInit(
      processName,
      "recordsParam=recordIds&recordIds=2,3"
    );
    expect(initResponse).toBeInstanceOf(QJobComplete);
    const qJobComplete = initResponse as QJobComplete;
    const processUUID = qJobComplete.processUUID;

    const records = await qController.processRecords(
      processName,
      processUUID,
      0,
      20
    );
    expect(records).toBeInstanceOf(Array);
    expect(records.length).toBe(2);
    expect(records[0].values).toBeInstanceOf(Map);
    expect(records[0].values.get("id")).not.toBeNull();
    expect(records[0].values.get("firstName")).not.toBeNull();
  });
});
