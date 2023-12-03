import { Paragraph, Header, AlignmentType } from 'docx';

const description = new Paragraph({
    text: "Relatórios de dados coletados",
    alignment: AlignmentType.CENTER,
    spacing: {
        before: 10,
        after: 10,
    },
});

export const header = new Header({
    children: [description],
});
