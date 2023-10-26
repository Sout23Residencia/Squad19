import { Document, Paragraph, Table, TableRow, TableCell, Packer } from "docx";
import * as fs from "fs";
import { DocumentData } from "firebase-admin/firestore";


export function Documento(objectDate: DocumentData) {
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
                                        children: [new Paragraph("Nome: " + objectDate["name"])],
                                    }),                              
                                ],
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    
        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(".\\testdocument.docx", buffer);
        })
}
