import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';

export function createDocumento(objectDate: any) {
    const programData = objectDate.program;

    let children = [
        new Paragraph({
            children: [new TextRun("Identificação do Paciente")]
        }),
        new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Nome: " + objectDate["name"])],
                        }),
                        new TableCell({
                            children: [new Paragraph("Data de Nascimento: " + objectDate["birthDate"])],
                        }),
                        new TableCell({
                            children: [new Paragraph("ID: " + objectDate["id"])]
                        })
                    ]
                })
            ]
        }),
    ];

    if (programData && programData.length > 0) {
        programData.forEach((programItem: any) => {
            const programSection = new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph("Nome do Programa: " + programItem.name)],
                            }),
                            new TableCell({
                                children: [new Paragraph("Area: " + programItem.area)],
                            }),
                        ]
                    })
                ]
            });

            children.push(new Paragraph({
                children: [new TextRun("Programas")]
            }));

            children.push(programSection);
        });
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: children
        }]
    });

    return Packer.toBuffer(doc);
}