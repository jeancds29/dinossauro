import { readFileSync,writeFileSync } from "fs";

const csvParser = (file) => {
    const csvRows = readFileSync(file, "utf-8").split("\n");
    const headers = csvRows[0].split(",");
    const formattedData = [];
  
    for (let i = 1; i < csvRows.length; i++) {
      const currentRow = csvRows[i].split(",");
      let rowObject = {};
  
      headers.map((header, index) => {
        rowObject[header] = currentRow[index];
      });
  
      formattedData.push(rowObject);
    }
    return formattedData;
};
  
let file1Data = csvParser('dataset1.csv')
let file2Data = csvParser('dataset2.csv')

file2Data = file2Data.filter(dataSet2 => (dataSet2.STANCE === "bipedal" && (file1Data.find(dataSet1 => dataSet2.NAME === dataSet1.NAME))))
file1Data = file1Data.filter(dataSet1 => ((file2Data.find(dataSet2 => dataSet1.NAME === dataSet2.NAME))))

file1Data.sort((a, b) => a.NAME.localeCompare(b.NAME))
file2Data.sort((a, b) => a.NAME.localeCompare(b.NAME))

let finalDataSet = [];

for(let i=0; i< file1Data.length; i++){ 
    const object = {...file1Data[i], ...file2Data[i]}

    finalDataSet.push(object);
}

const gravity = 9.8;

finalDataSet.forEach(element => {
    element.SPEED = ((element.STRIDE_LENGTH / element.LEG_LENGTH) - 1) * Math.sqrt(element.LEG_LENGTH * gravity)
});

finalDataSet.sort((a, b) => b.SPEED-a.SPEED);

const dinossaursOrdereBySpeed = finalDataSet.map(element => (`${element.NAME}\n`)).join('')

writeFileSync('./output.txt', dinossaursOrdereBySpeed);

export {csvParser, finalDataSet, dinossaursOrdereBySpeed}