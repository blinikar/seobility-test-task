export const checkForNoErrors = (errors: { [id: string]: string }): boolean => {
  for (const error in errors) if (errors[error] !== "") return false;
  return true;
}
