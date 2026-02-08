/**
 * Date formatting utilities
 */

export const formatDate = (date: string | Date): string => {
  if (!date) return '';

  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${year}`;
};

export const formatDateRange = (
  startDate: string,
  endDate: string,
  isCurrently: boolean = false
): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';

  return `${start} - ${end}`;
};

export const getMonthYear = (dateString: string): string => {
  if (!dateString) return '';

  const [year, month] = dateString.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const calculateMonthsDuration = (
  startDate: string,
  endDate: string,
  currentlyWorking: boolean = false
): number => {
  const start = new Date(startDate);
  const end = currentlyWorking ? new Date() : new Date(endDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return Math.max(0, months);
};
