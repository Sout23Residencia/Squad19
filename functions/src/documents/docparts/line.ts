import {Paragraph, BorderStyle} from 'docx';

export const line = new Paragraph({
    border: {
        bottom: {
            style: BorderStyle.SINGLE,
            size: 1,
            color: "000000",
        },
    },
});