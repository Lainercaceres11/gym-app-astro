import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface InvoiceData {
  customerName: string;
  customerEmail: string;
  membershipType: string;
  amount: number;
  currency: string;
  invoiceNumber: string;
  date: Date;
  companyName?: string;
  companyAddress?: string;
}

export async function createInvoicePDF(
  invoiceData: InvoiceData,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBoldFont = await pdfDoc.embedFont(
    StandardFonts.TimesRomanBold,
  );

  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();

  const margin = 50;
  let yPosition = height - margin;

  // Company header
  const companyName = invoiceData.companyName || "Your Company";
  const companyAddress = invoiceData.companyAddress || "Your Company Address";

  page.drawText(companyName, {
    x: margin,
    y: yPosition,
    size: 24,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;
  page.drawText(companyAddress, {
    x: margin,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Invoice title and number
  yPosition -= 60;
  page.drawText("INVOICE", {
    x: margin,
    y: yPosition,
    size: 28,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  const invoiceNumberText = `#${invoiceData.invoiceNumber}`;
  const invoiceNumberWidth = timesRomanBoldFont.widthOfTextAtSize(
    invoiceNumberText,
    18,
  );
  page.drawText(invoiceNumberText, {
    x: width - margin - invoiceNumberWidth,
    y: yPosition,
    size: 18,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  // Date
  yPosition -= 40;
  const formattedDate = invoiceData.date.toLocaleDateString();
  const dateText = `Date: ${formattedDate}`;
  const dateWidth = timesRomanFont.widthOfTextAtSize(dateText, 12);
  page.drawText(dateText, {
    x: width - margin - dateWidth,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Customer information
  yPosition -= 60;
  page.drawText("Bill To:", {
    x: margin,
    y: yPosition,
    size: 14,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 25;
  page.drawText(invoiceData.customerName, {
    x: margin,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;
  page.drawText(invoiceData.customerEmail, {
    x: margin,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Draw line separator
  yPosition -= 40;
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  // Item header
  yPosition -= 30;
  page.drawText("Description", {
    x: margin,
    y: yPosition,
    size: 12,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  const amountHeaderWidth = timesRomanBoldFont.widthOfTextAtSize("Amount", 12);
  page.drawText("Amount", {
    x: width - margin - amountHeaderWidth,
    y: yPosition,
    size: 12,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  // Item details
  yPosition -= 25;
  page.drawText(`${invoiceData.membershipType} Subscription`, {
    x: margin,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const formattedAmount = `${invoiceData.currency.toUpperCase()} ${invoiceData.amount.toFixed(2)}`;
  const formattedAmountWidth = timesRomanFont.widthOfTextAtSize(
    formattedAmount,
    12,
  );
  page.drawText(formattedAmount, {
    x: width - margin - formattedAmountWidth,
    y: yPosition,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Draw line separator
  yPosition -= 30;
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: width - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  // Total
  yPosition -= 30;
  const totalLabelWidth = timesRomanBoldFont.widthOfTextAtSize("Total:", 14);
  const totalAmountWidth = timesRomanBoldFont.widthOfTextAtSize(
    formattedAmount,
    14,
  );
  const totalSpacing = 20; // Space between "Total:" and the amount

  page.drawText("Total:", {
    x: width - margin - totalAmountWidth - totalSpacing - totalLabelWidth,
    y: yPosition,
    size: 14,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(formattedAmount, {
    x: width - margin - totalAmountWidth,
    y: yPosition,
    size: 14,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  // Thank you message
  yPosition -= 80;
  page.drawText("Thank you for your subscription!", {
    x: margin,
    y: yPosition,
    size: 14,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Footer
  const footerY = 50;
  page.drawText("This is an automatically generated invoice.", {
    x: margin,
    y: footerY,
    size: 10,
    font: timesRomanFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  return await pdfDoc.save();
}
