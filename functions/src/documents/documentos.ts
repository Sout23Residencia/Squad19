import { Document, Paragraph, Table, TableRow, TableCell} from "docx";
import { DocumentData } from "firebase-admin/firestore";


export function Documento(objectDate : DocumentData) : Document{
    let paragraph 
    
    if (objectDate["Status"] == "Morta") {
        paragraph = [new Paragraph("Ceifada por: " + objectDate["Ceifada por"])]
    } else {
        paragraph = [new Paragraph("Ocupação Atual" + objectDate["Ocupação Atual"])]
    }
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph("Nome: " + objectDate["Nome"])],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph("Status: " + objectDate["Status"])],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph("Idade: " + objectDate["idade"])],
                                    }),
                                    new TableCell({
                                        children: paragraph,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    return doc;
}



