const parseCategory = (category) => {
  const isString = typeof category === 'string';

  if (!isString) return;

  const isCategory = (category) =>
    ['books', 'electronics', 'clothing', 'other'].includes(category);

  if (isCategory(category)) return category;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = Number(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }
  const rounded = Math.round(parsedNumber * 100) / 100;
  return rounded;
};

export const parseFilterParams = (query) => {
  const { category, minPrice, maxPrice } = query;

  const parsedCategory = parseCategory(category);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedMaxPrice = parseNumber(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
