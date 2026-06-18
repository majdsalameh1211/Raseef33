export interface HourRow {
  days: string;
  hours: string;
  closed?: boolean;
}

export const CONTACT_HOURS: HourRow[] = [
  { days: 'Sun · Tue · Wed', hours: '13:00 – 22:30' },
  { days: 'Thu · Fri · Sat', hours: '13:00 – 23:00' },
  { days: 'Monday',          hours: 'Closed', closed: true },
];

export const CONTACT_INFO = {
  address:    'HaAtzmaut 33, Haifa',
  entrance:   'Entrance from HaNamal St.',
  phone:      '04-6638071',
  phoneTel:   'tel:046638071',
  wazeUrl:    'https://waze.com/ul?q=HaAtzmaut+33+Haifa+Israel',
  mapsUrl:    'https://maps.google.com/?q=HaAtzmaut+33+Haifa+Israel',
  mapEmbedUrl:'https://maps.google.com/maps?q=HaAtzmaut+33+Haifa+Israel&output=embed',
  bookUrl:    '#reserve',
} as const;