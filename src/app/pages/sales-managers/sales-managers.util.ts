import {
  addDays,
  isAfter,
  isBefore,
  isEqual,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import { Manager } from 'src/app/core/interfaces/manager.interfaces';

export const getFilterPredicate = () => {
  return (row: Manager, filters: string) => {
    const filterArray = filters.split('$');
    const username = filterArray[0];
    const name = filterArray[1];
    const surname = filterArray[2];
    const dateRegisteredRangeStart = filterArray[3];
    const dateRegisteredRangeEnd = filterArray[4];
    const totalSalesFrom = filterArray[5];
    const totalSalesTo = filterArray[6];

    const matchFilter = [];

    const columnUsername = row.username;
    const columnName = row.firstname;
    const columnSurname = row.lastname;
    const columnDateRegistered = row.dateRegistered;
    const columnTotalSales = row.totalSales.replace('$', '');

    const customFilterUsername = columnUsername
      .toLowerCase()
      .includes(username);
    const customFilterName = columnName.toLowerCase().includes(name);
    const customFilterSurname = columnSurname.toLowerCase().includes(surname);
    const customFilterDateRegistered = isDateInRange(
      columnDateRegistered,
      dateRegisteredRangeStart,
      dateRegisteredRangeEnd
    );
    const customFilterTotalSales =
      totalSalesFrom && totalSalesTo
        ? +columnTotalSales >= +totalSalesFrom &&
          +columnTotalSales <= +totalSalesTo
        : totalSalesFrom
        ? +columnTotalSales >= +totalSalesFrom
        : totalSalesTo
        ? +columnTotalSales <= +totalSalesTo
        : true;

    matchFilter.push(customFilterUsername);
    matchFilter.push(customFilterName);
    matchFilter.push(customFilterSurname);
    matchFilter.push(customFilterDateRegistered);
    matchFilter.push(customFilterTotalSales);

    return matchFilter.every(Boolean);
  };
};

const isDateInRange = (
  dateString: string,
  startDateString: string,
  endDateString: string
) => {
  const date = parseISO(dateString);
  const startDate = startDateString !== '' ? parseISO(startDateString) : null;
  const endDate =
    endDateString !== '' ? addDays(parseISO(endDateString), 1) : null;

  return startDate && endDate
    ? isWithinInterval(date, { start: startDate, end: endDate }) ||
        isEqual(date, startDate) ||
        isEqual(date, endDate)
    : startDate
    ? isAfter(date, startDate) || isEqual(date, startDate)
    : endDate
    ? isBefore(date, endDate) || isEqual(date, endDate)
    : true;
};
