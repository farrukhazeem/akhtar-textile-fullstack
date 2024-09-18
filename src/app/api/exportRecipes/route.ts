import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import ExcelJS from 'exceljs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
    headerRow.values = [
      'Recipe Number', 'FNO', 'Fabric', 'Wash', 'Active Flag', 'Load Size',
      'Action', 'Liters', 'RPM', 'Centigrade', 'PH', 'TDS', 'TSS',
      'Minutes', 'Step No', 'Chemical Name', 'Dosage %', 'Dosage', 'Total Weight', 'Concatenate'
    ];
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Apply colors and formatting to header row cells
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

    recipes.forEach((recipe) => {
      const initialRowIndex = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;
    
      // Add recipe row
      worksheet.addRow({
        recipe_number: recipe.recipe_number,
        fno: recipe.fno,
        fabric: recipe.fabric,
        wash: recipe.wash,
        active_flag: recipe.active_flag,
        load_size: recipe.load_size,
      });
    
      const recipeSteps = steps.filter(step => step.recipesid === recipe.id);
      recipeSteps.forEach((step) => {
        // Add step row
        worksheet.addRow({
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
        
        const stepChemicals = chemicalsAssociation
          .filter(assoc => assoc.stepid === step.id)
          .map(assoc => {
            const chemical = chemicals.find(c => c.id === assoc.chemicalid);
            return {
              chemical_name: chemical ? chemical.name : 'Unknown',
              dosage_percent: assoc.percentage !== null ? assoc.percentage : 'Unknown',
              dosage: assoc.dosage !== null ? assoc.dosage : 'Unknown'
            };
          });
          
        stepChemicals.forEach((chemical) => {
          worksheet.addRow({
            chemical_name: chemical.chemical_name,
            dosage_percent: chemical.dosage_percent,
            dosage: chemical.dosage,
          });
        });
      });
    

      const lastRow = worksheet.getRow(worksheet.lastRow.number);
      for (let col = 1; col <= 20; col++) { 
        const cell = lastRow.getCell(col);
        cell.border = {
          bottom: { style: 'thick', color: { argb: '000000' } },
        };
      }
    
      // Apply vertical lines to the sections
      const sectionColumns = [6, 13, 17, 20];
      sectionColumns.forEach(colNum => {
        for (let rowNum = initialRowIndex; rowNum <= worksheet.lastRow.number; rowNum++) {
          const cell = worksheet.getRow(rowNum).getCell(colNum);
          cell.border = {
            right: { style: 'thick', color: { argb: '000000' } },
          };
        }
      });
    });
    
    
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
      column.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    

    // Dynamically set the column widths
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    // Apply alignment to all columns
    worksheet.columns.forEach(column => {
      column.alignment = { horizontal: 'center', vertical: 'middle' };
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
