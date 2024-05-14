const getHeaders = () => {
  const headers = [];
  headers.push({ name: 'Найменування', relation: 10 });
  headers.push({ name: 'К-сть', relation: 4 });
  headers.push({ name: '', relation: 2, alignment: 'center' });
  headers.push({ name: 'Ціна', relation: 4, alignment: 'right' });
  headers.push({ name: 'Загалом', relation: 6, alignment: 'right' });
  headers.push({ name: '', relation: 2, alignment: 'right' });

  return headers;
};

export default getHeaders;
