const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const ExcelJs = require('exceljs');



function setupNodeEvents(on, config) {
  // implement node event listeners here

  on('task', {
    convertExcelToJson(filePath) {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
      });
      return result;
    }
  });

  on('task', {
    async writeExcelFile({ searchText, replaceText, change, filePath }) {
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet("Sheet1");

      const dimensions = await readExcelFile(worksheet, searchText);
      const cell = worksheet.getCell(dimensions.raws + change.rowChange, dimensions.columns + change.colChange);
      cell.value = replaceText;
      return await workbook.xlsx.writeFile(filePath).then(() => {
        return true;
      }).catch((error) => {
        console.error("Error writing to Excel file:", error);
        return false;
      });
    }
  });
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://216.10.245.166',
    setupNodeEvents
  },
});

async function readExcelFile(worksheet, searchText) {
  let dimensions = { raws: 0, columns: 0 };

  worksheet.eachRow((row, rownumber) => {

    row.eachCell((cell, conumber) => {
      if (cell.value === searchText)  // Change "Banana" to the value you are looking for
      {
        dimensions.raws = rownumber;
        dimensions.columns = conumber;
        console.log(`Row: ${rownumber}, Column: ${conumber}, Value: ${cell.value}`);
      }
    });

  });
  return dimensions;
}
