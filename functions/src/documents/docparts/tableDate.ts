import {Paragraph, Table, TableCell, TableRow, WidthType, TextRun } from 'docx';

export function createTableData(objectDate: any) {
  const programsData = objectDate.programs;
 
  const tables: any[] = [];
  
  programsData.forEach((programs: any) => {
  const Paragraph1 = new Paragraph("Programa: " + programs["name"] + " | Área: " + programs["area"]);
 
  programs.datasheets.forEach((datasheet: any) => {
    const Paragraph2 = new Paragraph("Folha: " + datasheet["name"] + " | Tipo:");
    const Paragraph3 = new Paragraph({
     children: [
       new TextRun({
         text: "Fim da folha: " + datasheet["name"],
         bold: true,
       }),
     ],
     spacing: {
       before: 500,
       after: 500,
     },
    });
 
    const tableRows = [
        new TableRow({
         children: [
          new TableCell({ children: [new Paragraph("Sessão")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Data")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Terapeuta")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Fase")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Tentativas")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("incorretas")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Ajuda")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Independentes")], width: { size: 5000, type: WidthType.DXA } }),
          new TableCell({ children: [new Paragraph("Acertos")], width: { size: 5000, type: WidthType.DXA } }),
         ],
        }),
    ];
 
    datasheet.attemptBlocks.forEach((attemptBlock: any) => {
      const datinha = new Date(attemptBlock.metadata["createdAt"] )
      if(datinha >= objectDate.dataInicial && datinha <= objectDate.dataFinal){
        for (let nomeMap in attemptBlock.attempts) {
          let map = attemptBlock.attempts[nomeMap];
          const tableRow = new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(map["targetNumber"])], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph(attemptBlock.metadata["createdAt"])], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph(attemptBlock.datasheet.applicationType["acronym"])], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
              new TableCell({ children: [new Paragraph("")], width: { size: 5000, type: WidthType.DXA } }),
            ],
          });
   
          tableRows.push(tableRow);
        }
      }
    });
 
    const table = new Table({
     rows: tableRows,
    });
 
    tables.push(Paragraph1, Paragraph2, table, Paragraph3 );
  });
  });
  
  return tables;
}
