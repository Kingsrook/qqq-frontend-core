/*
 * Copyright © 2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

// import {QController} from "../../src/controllers/QController";
// import {QTableMetaData} from '../../src/model/metaData/QTableMetaData';

describe('q controller test', () =>
{
   it('should return meta data', async () =>
   {
       //const qController = new QController('http://localhost:8000');
       //const metaData: Map<string, QTableMetaData> = await qController.loadMetaData();
       //console.log('@dk label: ' + metaData?.get("person")?.label);
       //expect(metaData?.get("person")?.label).toBe("Person");
   });

   it('should return an error with a bad base url meta data', async () =>
   {
       //const qController = new QController('http://localhost.not:8000');
       //try
       //{
       //   await qController.loadMetaData();
       //   fail();
       //}
       //catch(e)
       //{
       //  expect(e).toBeDefined();
       //}
   });

})
