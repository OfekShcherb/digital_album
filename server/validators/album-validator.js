const allowedFields = new Set(["title"]);
const prohibitedField = new Set(["_id", "createdAt", "pages"]);

const validateDataForAlbum = (data) => {
  const [key, value] = Object.entries(data)[0];
  if (prohibitedField.has(key)) {
    return `Can't change field: ${key}`;
  }
  if (!allowedFields.has(key)) {
    return `missing field: ${key}`;
  }

  if (key === "title" && value === "") {
    return `missing value: empty title`;
  }
  return "";
};

module.exports = {
  validateDataForAlbum,
};
