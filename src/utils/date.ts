export const dayNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-Feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

export function makeDate(time?: number): Date {
  const date = !!time ? new Date(time) : new Date();
  date.setHours(11, 0, 0, 0);
  return date;
}

export function equalsDates(d1: Date, d2: Date): boolean {
  return d1.getDay() === d2.getDay() && d1.getDate() === d2.getDate();
}

export function isToday(date: Date): boolean {
  const currDate = makeDate();
  return equalsDates(date, currDate);
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return equalsDates(date, tomorrow);
}
