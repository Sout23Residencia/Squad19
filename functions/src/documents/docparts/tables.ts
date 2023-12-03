import {Paragraph, Table, TableCell, TableRow, WidthType, TextRun } from 'docx';

type AttemptSession = {
 [key: string]: {
 totalIncorrect: number;
 totalCorrectWithCue: number;
 totalIndependent: number;
 totalCorrect: number;
 totalAttempt: number;
 };
};

export function createTables(objectDate: any) {
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

 let attemptsPerSession: AttemptSession = {};

 let dataObj: { [key: string]: any } = {};

 datasheet.attemptBlocks.forEach((attemptBlock: any) => {
 for (let nomeMap in attemptBlock.attempts) {
 let map = attemptBlock.attempts[nomeMap];
 if (map && map.record) {
 let recordType = map.record.recordType;
 let data = attemptBlock.metadata.createdAt.toString();
 let targetNumber = map.targetNumber.toString();

 dataObj[targetNumber] = data;

 if (!attemptsPerSession[targetNumber]) {
 attemptsPerSession[targetNumber] = {
 totalIncorrect: 0,
 totalCorrectWithCue: 0,
 totalIndependent: 0,
 totalCorrect: 0,
 totalAttempt: 0
 };
 }

 if (recordType == "independent") {
 attemptsPerSession[targetNumber].totalIndependent++;
 attemptsPerSession[targetNumber].totalCorrect++;
 attemptsPerSession[targetNumber].totalAttempt++;
 } else if (recordType == "correctWithCue") {
 attemptsPerSession[targetNumber].totalCorrectWithCue++;
 attemptsPerSession[targetNumber].totalCorrect++;
 attemptsPerSession[targetNumber].totalAttempt++;
 } else if (recordType == "incorrect") {
 attemptsPerSession[targetNumber].totalIncorrect++;
 attemptsPerSession[targetNumber].totalAttempt++;
 }
 }
 }
 });

 let acronym = datasheet.applicationType["acronym"];
 const therapistName = datasheet.metadata.createdBy["firstName"] + " " + datasheet.metadata.createdBy["lastName"];


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

 for (let targetNumber in attemptsPerSession) {
 const tableRow = new TableRow({
 children: [
 new TableCell({ children: [new Paragraph(targetNumber)], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(dataObj[targetNumber])], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(therapistName)], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(acronym)], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(attemptsPerSession[targetNumber].totalAttempt.toString())], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(attemptsPerSession[targetNumber].totalIncorrect.toString())], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(attemptsPerSession[targetNumber].totalCorrectWithCue.toString())], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(attemptsPerSession[targetNumber].totalIndependent.toString())], width: { size: 5000, type: WidthType.DXA } }),
 new TableCell({ children: [new Paragraph(attemptsPerSession[targetNumber].totalCorrect.toString())], width: { size: 5000, type: WidthType.DXA } }),
 ],
 });

 tableRows.push(tableRow);
}

 const table = new Table({
 rows: tableRows,
 });

 tables.push(Paragraph1, Paragraph2, table, Paragraph3);
});
});

return tables;
}
