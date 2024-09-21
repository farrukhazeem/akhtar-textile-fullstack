// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';
// import ExcelJS from 'exceljs';

// const pool = new Pool({
//   connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export async function GET() {
//   try {
//     const client = await pool.connect();
    
//     const recipesResult = await client.query('SELECT * FROM recipes');
//     const stepsResult = await client.query('SELECT * FROM steps');
//     const chemicalsResult = await client.query('SELECT * FROM chemicals');
//     const chemicalsAssocResult = await client.query('SELECT * FROM chemical_association');
    
//     client.release();

//     const recipes = recipesResult.rows;
//     const steps = stepsResult.rows;
//     const chemicals = chemicalsResult.rows;
//     const chemicalsAssociation = chemicalsAssocResult.rows;

//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Recipes');

//     worksheet.columns = [
//       { header: 'Recipe Number', key: 'recipe_number' },
//       { header: 'FNO', key: 'fno' },
//       { header: 'Fabric', key: 'fabric' },
//       { header: 'Wash', key: 'finish' },
//       { header: 'Active Flag', key: 'active_flag' },
//       { header: 'Load Size', key: 'load_size' },
//       { header: 'Action', key: 'action' },
//       { header: 'Liters', key: 'liters' },
//       { header: 'RPM', key: 'rpm' },
//       { header: 'Centigrade', key: 'centigrade' },
//       { header: 'PH', key: 'ph' },
//       { header: 'TDS', key: 'tds' },
//       { header: 'TSS', key: 'tss' },
//       { header: 'Minutes', key: 'minutes' },
//       { header: 'Step No', key: 'step_no' },
//       { header: 'Chemical Name', key: 'chemical_name' },
//       { header: 'Dosage %', key: 'dosage_percent' },
//       { header: 'Dosage', key: 'dosage' },
//       { header: 'Total Weight', key: 'total_weight' },
//       { header: 'Concatenate', key: 'concatenate' },
//     ];

//     // Set the header row
//     const headerRow = worksheet.getRow(1);
//     headerRow.values = [
//       'Recipe Number', 'FNO', 'Fabric', 'Wash', 'Active Flag', 'Load Size',
//       'Action', 'Liters', 'RPM', 'Centigrade', 'PH', 'TDS', 'TSS',
//       'Minutes', 'Step No', 'Chemical Name', 'Dosage %', 'Dosage', 'Total Weight', 'Concatenate'
//     ];
//     headerRow.font = { bold: true };
//     headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

//     headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
//       if (colNumber <= 6) { 
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: '7030a0' },
//         };
//       } else if (colNumber <= 13) {
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: 'ffff00' },
//         };
//       } else if (colNumber <= 17) {
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: 'e26b0a' },
//         };
//       } else {
//         cell.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: '4f81bd' },
//         };
//       }
//     });

//     recipes.forEach((recipe) => {
//       // Filter steps related to the current recipe
//       const recipeSteps = steps.filter(step => step.recipesid === recipe.id);
      
//       recipeSteps.forEach((step) => {
//         // Get chemicals associated with the step
//         const stepChemicals = chemicalsAssociation
//           .filter(assoc => assoc.stepid === step.id)
//           .map(assoc => {
//             const chemical = chemicals.find(c => c.id === assoc.chemicalid);
//             return {
//               chemical_name: chemical ? chemical.name : 'Unknown',
//               dosage_percent: assoc.percentage !== null ? assoc.percentage : 'Unknown',
//               dosage: assoc.dosage !== null ? assoc.dosage : 'Unknown',
//             };
//           });
    
//         // Repeat FNO, Fabric, Wash, Active Flag, Load Size, and step details for each chemical
//         stepChemicals.forEach((chemical) => {
//           worksheet.addRow({
//             recipe_number: recipe.recipe_number,
//             fno: recipe.fno,
//             fabric: recipe.fabric,
//             wash: recipe.wash,
//             active_flag: recipe.active_flag,
//             load_size: recipe.load_size,
//             action: step.action,
//             liters: step.liters,
//             rpm: step.rpm,
//             centigrade: step.centigrade,
//             ph: step.ph,
//             tds: step.tds,
//             tss: step.tss,
//             minutes: step.minutes,
//             step_no: step.step_no,
//             chemical_name: chemical.chemical_name,
//             dosage_percent: chemical.dosage_percent,
//             dosage: chemical.dosage,
//           });
//         });
    
//         // If no chemicals are associated, still repeat FNO, Fabric, Wash, Active Flag, and Load Size
//         if (stepChemicals.length === 0) {
//           worksheet.addRow({
//             recipe_number: recipe.recipe_number,
//             fno: recipe.fno,
//             fabric: recipe.fabric,
//             wash: recipe.wash,
//             active_flag: recipe.active_flag,
//             load_size: recipe.load_size,
//             action: step.action,
//             liters: step.liters,
//             rpm: step.rpm,
//             centigrade: step.centigrade,
//             ph: step.ph,
//             tds: step.tds,
//             tss: step.tss,
//             minutes: step.minutes,
//             step_no: step.step_no,
//           });
//         }
//       });
    
//       const lastRow = worksheet.lastRow;
//       if (lastRow) { // Check if lastRow is defined
//         for (let col = 1; col <= 20; col++) {
//           const cell = lastRow.getCell(col);
//           cell.border = {
//             bottom: { style: 'thick', color: { argb: '000000' } },
//           };
//         }

//         // Apply vertical lines to the sections
//         const sectionColumns = [6, 13, 17, 20];
//         sectionColumns.forEach(colNum => {
//           for (let rowNum = lastRow.number - recipeSteps.length + 1; rowNum <= lastRow.number; rowNum++) {
//             const row = worksheet.getRow(rowNum);
//             const cell = row.getCell(colNum);
//             cell.border = {
//               right: { style: 'thick', color: { argb: '000000' } },
//             };
//           }
//         });
//       }
//     });    
    
//     // Ensure the column is defined and has the eachCell method
//     worksheet.columns.forEach(column => {
//       if (column && typeof column.eachCell === 'function') { // Check if column and method exist
//         let maxLength = 0;
//         column.eachCell({ includeEmpty: true }, (cell) => {
//           const columnLength = cell.value ? cell.value.toString().length : 10;
//           if (columnLength > maxLength) {
//             maxLength = columnLength;
//           }
//         });
//         column.width = maxLength < 10 ? 10 : maxLength;
//         column.alignment = { horizontal: 'center', vertical: 'middle' };
//       }
//     });

//     // Apply alignment to all columns
//     worksheet.columns.forEach(column => {
//       if (column && typeof column.alignment === 'object') { // Check if column and alignment property exist
//         column.alignment = { horizontal: 'center', vertical: 'middle' };
//       }
//     });

//     const buffer = await workbook.xlsx.writeBuffer();

//     return new NextResponse(buffer, {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'Content-Disposition': 'attachment; filename=recipes.xlsx',
//       },
//     });
//   } catch (error) {
//     console.error('Failed to export recipes:', error);
//     return new NextResponse('Error exporting recipes', { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import ExcelJS from 'exceljs';

const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    const recipesResult = await client.query('SELECT * FROM recipes');
    const stepsResult = await client.query('SELECT * FROM steps');
    const chemicalsResult = await client.query('SELECT * FROM chemicals');
    const chemicalsAssocResult = await client.query('SELECT * FROM chemical_association');
    
    client.release();

    const recipes = recipesResult.rows;
    const steps = stepsResult.rows;
    const chemicals = chemicalsResult.rows;
    const chemicalsAssociation = chemicalsAssocResult.rows;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Recipes');

    worksheet.columns = [
      { header: 'Recipe Number', key: 'recipe_number' },
      { header: 'FNO', key: 'fno' },
      { header: 'Fabric', key: 'fabric' },
      { header: 'Wash', key: 'wash' },
      { header: 'Active Flag', key: 'active_flag' },
      { header: 'Load Size', key: 'load_size' },
      { header: 'Action', key: 'action' },
      { header: 'Liters', key: 'liters' },
      { header: 'RPM', key: 'rpm' },
      { header: 'Centigrade', key: 'centigrade' },
      { header: 'PH', key: 'ph' },
      { header: 'TDS', key: 'tds' },
      { header: 'TSS', key: 'tss' },
      { header: 'Minutes', key: 'minutes' },
      { header: 'Step No', key: 'step_no' },
      { header: 'Chemical Name', key: 'chemical_name' },
      { header: 'Dosage %', key: 'dosage_percent' },
      { header: 'Dosage', key: 'dosage' },
      { header: 'Total Weight', key: 'total_weight' },
      { header: 'Concatenate', key: 'concatenate' },
    ];

    // Set the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (colNumber <= 6) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '7030a0' },
        };
      } else if (colNumber <= 13) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffff00' },
        };
      } else if (colNumber <= 17) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'e26b0a' },
        };
      } else {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4f81bd' },
        };
      }
    });

    // Set to track existing rows to avoid duplicates
    const rowSet = new Set();

    recipes.forEach((recipe) => {
      // Filter steps related to the current recipe
      const recipeSteps = steps.filter(step => step.recipesid === recipe.id);
      
      let firstStepRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;
      
      recipeSteps.forEach((step) => {
        // Get chemicals associated with the step
        const stepChemicals = chemicalsAssociation
          .filter(assoc => assoc.stepid === step.id)
          .map(assoc => {
            const chemical = chemicals.find(c => c.id === assoc.chemicalid);
            return {
              chemical_name: chemical ? chemical.name : 'Unknown',
              dosage_percent: assoc.percentage !== null ? assoc.percentage : 'Unknown',
              dosage: assoc.dosage !== null ? assoc.dosage : 'Unknown',
            };
          });

        stepChemicals.forEach((chemical) => {
          // Create a unique key for the current row to check for duplicates
          const rowKey = `${recipe.recipe_number}-${step.step_no}-${chemical.chemical_name}`;
          
          if (!rowSet.has(rowKey)) {
            worksheet.addRow({
              recipe_number: recipe.recipe,
              fno: recipe.fno,
              fabric: recipe.fabric,
              wash: recipe.finish,  // Correctly using 'finish' for wash
              active_flag: 'Y',     // Default value
              load_size: recipe.load_size,
              action: step.action,
              liters: step.liters,
              rpm: step.rpm,
              centigrade: step.centigrade,
              ph: step.ph,
              tds: step.tds,
              tss: step.tss,
              minutes: step.minutes,
              step_no: step.step_no,
              chemical_name: chemical.chemical_name,
              dosage_percent: chemical.dosage_percent,
              dosage: chemical.dosage,
            });
            rowSet.add(rowKey);  // Mark row as added to prevent duplicates
          }
        });

        if (stepChemicals.length === 0) {
          // Create a unique key for steps without chemicals
          const rowKey = `${recipe.recipe_number}-${step.step_no}`;
          
          if (!rowSet.has(rowKey)) {
            worksheet.addRow({
              recipe_number: recipe.recipe,
              fno: recipe.fno,
              fabric: recipe.fabric,
              wash: recipe.finish,  // Correctly using 'finish' for wash
              active_flag: 'Y',     // Default value
              load_size: recipe.load_size,
              action: step.action,
              liters: step.liters,
              rpm: step.rpm,
              centigrade: step.centigrade,
              ph: step.ph,
              tds: step.tds,
              tss: step.tss,
              minutes: step.minutes,
              step_no: step.step_no,
            });
            rowSet.add(rowKey);  // Mark row as added to prevent duplicates
          }
        }
      });
    
      const lastRow = worksheet.lastRow;
      if (lastRow) {
        // Apply bottom border for the last row of the recipe
        for (let col = 1; col <= 20; col++) {
          const cell = lastRow.getCell(col);
          cell.border = {
            bottom: { style: 'thick', color: { argb: '000000' } },
          };
        }

        // Apply vertical lines to the sections
        const sectionColumns = [6, 13, 17, 20];
        sectionColumns.forEach(colNum => {
          for (let rowNum = firstStepRow; rowNum <= lastRow.number; rowNum++) {
            const row = worksheet.getRow(rowNum);
            const cell = row.getCell(colNum);
            cell.border = {
              right: { style: 'thick', color: { argb: '000000' } },
            };
          }
        });
      }
    });

    worksheet.columns.forEach(column => {
      if (column && typeof column.eachCell === 'function') {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength;
        column.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=recipes.xlsx',
      },
    });
  } catch (error) {
    console.error('Failed to export recipes:', error);
    return new NextResponse('Error exporting recipes', { status: 500 });
  }
}
