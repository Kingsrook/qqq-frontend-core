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
import { QTableMetaData } from "../../src/model/metaData/QTableMetaData";
import { QTableRecord } from "../../src/model/metaData/QTableRecord";

describe("q controller test", () => {
  it("should return meta data", async () => {
    const qController = new QController("http://localhost:8000");
    const metaData: Map<string, QTableMetaData> =
      await qController.loadMetaData();
    console.log("@dk label: " + metaData?.get("person")?.label);
    expect(metaData?.get("person")?.label).toBe("Person");
  });

  it("should return an error with a bad base url meta data", async () => {
    const qController = new QController("http://localhost.not:8000");
    try {
      await qController.loadMetaData();
      fail();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("should return table meta data", async () => {
    const qController = new QController("http://localhost:8000");
    const tableMetaData: QTableMetaData = await qController.loadTableMetaData(
      "carrier"
    );
    console.log("@dk label: " + tableMetaData?.label);
    console.log("@dk fields: " + tableMetaData?.fields);
    expect(tableMetaData?.label).toBe("Carrier");
  });

  it("should return record data from a query", async () => {
    const qController = new QController("http://localhost:8000");
    const records: QTableRecord[] = await qController.query("person");
    console.log("@tc label: " + records.length);
    expect(records.length).toBe(5);
  });
});
