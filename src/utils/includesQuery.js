export const includesQuery = (query, title) => {
  const regex = new RegExp(query, "gi");
  return regex.test(title);
};
