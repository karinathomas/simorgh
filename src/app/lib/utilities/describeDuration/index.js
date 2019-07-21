const defaultTranslations = {
  s: '{x} second',
  ss: '{x} seconds',
  m: '{x} minute',
  mm: '{x} minutes',
  h: '{x} hour',
  hh: '{x} hours',
};

const humanize = (labels, key, num) => {
  if (num === 1) {
    return `${labels[key].replace('{x}', num)} `;
  }
  if (num > 1) {
    return `${labels[key.repeat(2)].replace('{x}', num)} `;
  }
  return '';
};

const describeDuration = (duration, translations) => {
  // eslint-disable-next-line no-underscore-dangle
  const labels = translations || defaultTranslations;

  const hrs = humanize(labels, 'h', duration.hours());
  const mins = humanize(labels, 'm', duration.minutes());
  const sec = humanize(labels, 's', duration.seconds());

  const out = hrs + mins + sec;
  return out.trim();
};

export default describeDuration;
