import { createTables } from '../documents/docparts/tables';
import { footer } from '../documents/docparts/footer';
import { header } from '../documents/docparts/header';
import { Document, Packer, Paragraph} from 'docx';
import {line} from '../documents/docparts/line';
import { createTableData } from './docparts/tableDate';

export function createDocumento(objectDate: any) {
    let tables : any
    let children
 if(objectDate.temData){
    console.log(objectDate.dataFinal + " e " + objectDate.dataInicial)
    tables = createTableData(objectDate)
    children = [
        new Paragraph("Estudante: " + objectDate["name"]),
        new Paragraph("Clinica: "),
        new Paragraph("Emitido em: " + objectDate.metadata["createdAt"]),
        new Paragraph("Periodo: " + objectDate.dataFinal + " e " + objectDate.dataInicial),
    ];

    
 }else{
    tables = createTables(objectDate);
    children = [
        new Paragraph("Estudante: " + objectDate["name"]),
        new Paragraph("Clinica: "),
        new Paragraph("Emitido em: " + objectDate.metadata["createdAt"])
    ];
 }

 const doc = new Document({
     sections: [{
         properties: {},
         children: [...children, line, ...tables],
         headers: {
             default: header,
         },
         footers: {
             default: footer,
         },
     }]
 });

 return Packer.toBuffer(doc);
}
