import { createTables } from '../documents/docparts/tables';
import { footer } from '../documents/docparts/footer';
import { header } from '../documents/docparts/header';
import { Document, Packer, Paragraph} from 'docx';
import {line} from '../documents/docparts/line';
import { createTableData } from './docparts/tableDate';



export function createDocumento(objectDate: any) {
    let tables : any

let children = [
     new Paragraph("Estudante: " + objectDate["name"]),
     new Paragraph("Clinica: "),
     new Paragraph("Emitido em: " + objectDate.metadata["createdAt"]),
     new Paragraph("Periodo: "),
 ];
 if(objectDate.temData){
    console.log(objectDate.dataFinal + " e " + objectDate.dataInicial)
    tables = createTableData(objectDate)
 }else{
    tables = createTables(objectDate);
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
