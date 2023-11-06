import { Document, Packer, Paragraph, ImageRun, Header, Footer, AlignmentType, BorderStyle, Table, TableCell, TableRow } from 'docx';
import * as fs from 'fs';

export function createDocumento(objectDate: any) {
    const programData = objectDate.programs;
    //const attendanceData = objectDate.attendances;
    const behaviorData = objectDate.behaviors;

    let children = [
        new Paragraph("Estudante: " + objectDate["name"]),
        new Paragraph("Clinica: "),
        new Paragraph("Emitido em: " + objectDate.metadata["createdAt"]),
        new Paragraph("Periodo: "),
    ];

    const imageBuffer = fs.readFileSync('../functions/src/documents/img/logo-bhave.png');

    const image = new ImageRun({
        data: imageBuffer,
        transformation: {
            width: 140,
            height: 60,
        },
    });

    const paragraphWithImage = new Paragraph({
        children: [image],
        alignment: AlignmentType.CENTER,
    });

    const description = new Paragraph({
        text: "Relatórios de dados coletados",
        alignment: AlignmentType.CENTER,
        spacing: {
            before: 10,
            after: 10,
        },
    });

    const line = new Paragraph({
        border: {
            bottom: {
                style: BorderStyle.SINGLE,
                size: 1,
                color: "000000",
            },
        },
    });

    const paragraphs = programData.map((program: any) => {
        return new Paragraph("Programa: " + program["name"] + "  |  Área: " + program["area"]);
    });

    const newParagraph2 = new Paragraph("Folha: DAV de Cores" + "  |  Tipo: DTT");

    const header = new Header({
        children: [paragraphWithImage, description],
    });

    const footer = new Footer({
        children: [
            new Paragraph('®bHave Tecnologia Comportamental'),
            new Paragraph('RUA DO APOLO, 235. BAIRRO DO RECIFE, RECIFE, PE. CEP 50.030.220, CAIXA POSTAL 0015'),
            new Paragraph('CNPJ: 24.832.498/0001-17 ● 55 81 3224.7289 ● contato@bhave.life ●  www.bhave.life'),
        ],
    });

    const tabela = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph("Data")] }),
                    new TableCell({ children: [new Paragraph("Terapeuta")] }),
                    new TableCell({ children: [new Paragraph("Fase")] }),
                ],
            }),
            ...behaviorData.map((behavior: any) => {
                return new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(behavior.metadata["createdAt"])] }),
                        new TableCell({ children: [new Paragraph(" " + behavior.metadata.createdBy["firstName"] + " " + behavior.metadata.createdBy["lastName"] + " ")]}),
                        new TableCell({ children: [new Paragraph(behavior["name"])]}),
                    ],
                });
            }),
        ],
    });

    const doc = new Document({
        sections: [{
            properties: {},
            children: [...children, line, ...paragraphs, newParagraph2, line, tabela],
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
