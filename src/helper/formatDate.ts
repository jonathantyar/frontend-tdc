export function convertRFC3339ToDate(rfc3339String: string): string {
  const date = new Date(rfc3339String);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleString('en-US', options);
}
