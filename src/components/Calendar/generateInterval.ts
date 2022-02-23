import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DateData } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';

import theme from '../../styles/theme';

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp)})
    .forEach(( item ) => {
      const date = format(getPlatformDate(item), 'yyyy-MM-dd');

      interval = {
        ...interval,
        [date]: {
          color: start.dateString === date || end.dateString === date 
            ? theme.colors.main : theme.colors.main_light,

          textColor: start.dateString === date || end.dateString === date 
            ? theme.colors.main_light : theme.colors.main,
        }
      }
    });

  return interval;
}