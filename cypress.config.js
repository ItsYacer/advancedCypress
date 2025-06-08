const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');



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
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://216.10.245.166',
    setupNodeEvents
  },
});
