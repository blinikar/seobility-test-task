export const stringifyForm = (values: { [id: string]: string }) => {
  let result = "";
  for (const key in values) {
    result += key;
    result += "=";
    result += values[key];
    result += "&";
  }
  result = result.slice(0, result.length-1);

  return result;
}

