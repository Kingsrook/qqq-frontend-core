/*
 * Copyright © 2021-2021. Kingsrook LLC <contact@kingsrook.com>.  All Rights Reserved.
 */

import {QController} from './controllers/QController';
import {QTableMetaData} from './model/metaData/QTableMetaData';
import {QFieldMetaData} from './model/metaData/QFieldMetaData';
import {QFieldType} from './model/metaData/QFieldType';

/*
export function add(x: number, y: number): number
{
   return x + y;
}

export function mul(x: number, y: number): number
{
   return x * y;
}
*/

module.exports = {
   QController,
   QTableMetaData,
   QFieldMetaData,
   QFieldType
};