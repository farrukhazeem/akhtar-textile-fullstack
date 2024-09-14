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
    const result = await client.query('SELECT * FROM recipes');
    client.release();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Recipes');

    // Merge cells A1 to F1 for the "Recipe Information" header
    worksheet.mergeCells('A1:F1');
    worksheet.getCell('A1').value = 'Recipe Information';
    worksheet.getCell('A1').font = { bold: true, size: 14 };
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };

    // Define columns starting from the second row
    worksheet.columns = [
      { header: 'FNO', key: 'fno', width: 10 },
      { header: 'Fabric', key: 'fabric', width: 15 },
      { header: 'Wash', key: 'wash', width: 15 },
      { header: 'Active_Flag', key: 'active_flag', width: 15 },
      { header: 'Load Size', key: 'load_size', width: 15 },
    ];

    // Add headers to the second row
    const headerRow = worksheet.getRow(2);
    headerRow.values = ['FNO', 'Fabric', 'Wash', 'Active_Flag', 'Load Size'];
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '7030a0' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Add rows from the database
    result.rows.forEach((recipe) => {
      worksheet.addRow(recipe);
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
