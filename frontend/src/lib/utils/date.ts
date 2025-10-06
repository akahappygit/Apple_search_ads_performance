import { addDays, format, subDays } from "date-fns";

export const fmtDate = (d: Date) => format(d, "yyyy-MM-dd");
export const today = () => new Date();
export const daysAgo = (n: number) => subDays(new Date(), n);
export const rangeLastNDays = (n: number) => ({ from: fmtDate(subDays(new Date(), n)), to: fmtDate(today()) });