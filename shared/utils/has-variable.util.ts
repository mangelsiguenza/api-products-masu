export const hasVariable = (varName: string): boolean => {
  return Object.keys(process.env).includes(varName);
};
