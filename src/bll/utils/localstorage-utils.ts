export const loadToken = (): JSON | undefined => {
  try {
    const serializedToken = localStorage.getItem('access_token');

    if (serializedToken === null) {
      return undefined;
    }

    return JSON.parse(serializedToken);
  } catch (err) {
    return undefined;
  }
};
export const saveToken = (token: string): void => {
  try {
    const serializedToken = JSON.stringify(token);

    localStorage.setItem('access_token', serializedToken);
  } catch {
    // ignore write errors
  }
};
