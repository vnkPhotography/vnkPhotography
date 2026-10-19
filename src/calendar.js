/**
 * THE CALENDAR PAGE
 *
 * While `ready` is false, the Calendar page shows a short "coming soon" note.
 *
 * The calendar (same format every year): 14 portrait sheets
 *   cover · January … December · back
 * Each month sheet has the photo on the top half and the dates on the bottom half.
 *
 * When the calendar is finished, Nithin's calendar maker produces a folder
 * called "website" with exactly these files:
 *     cover.jpg, 01.jpg … 12.jpg, back.jpg
 *     VNK_Calendar_<year>.pdf          (light version)
 *     VNK_Calendar_<year>_print.pdf    (print quality)
 *   1. Copy them all into public/calendar/
 *   2. Check the year and the two file sizes below
 *   3. Set ready: true and publish
 */
const YEAR = 2027;

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const CALENDAR = {
  year: YEAR,
  ready: false,

  pdf: `VNK_Calendar_${YEAR}.pdf`,            // light version: phones, WhatsApp, screens
  pdfSize: "5 MB",
  printPdf: `VNK_Calendar_${YEAR}_print.pdf`, // print quality ("" = hide the link)
  printSize: "21 MB",

  pages: [
    { file: "cover.jpg", label: "Cover" },
    ...MONTHS.map((m, i) => ({ file: `${String(i + 1).padStart(2, "0")}.jpg`, label: m })),
    { file: "back.jpg", label: "The photographs" },
  ],
};
