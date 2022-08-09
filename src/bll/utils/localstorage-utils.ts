// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loadToken = () => {
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
    const serializedState = JSON.stringify(token);

    localStorage.setItem('access_token', serializedState);
  } catch {
    // ignore write errors
  }
};
