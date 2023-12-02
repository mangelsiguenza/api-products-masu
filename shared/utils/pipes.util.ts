export const errorDetails = (errors) => {
  return errors.flatMap((err) => {
    if (err.constraints) return Object.values(err.constraints);
    return errorDetails(err.children);
  });
};
