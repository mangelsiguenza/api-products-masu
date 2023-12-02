export const formatErrorCode = (code: string): string => {
  return code
    .replace(/\//g, '-')
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join('-');
};
