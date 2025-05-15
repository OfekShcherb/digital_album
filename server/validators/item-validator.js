validItemTypes = new Set(["image", "video", "audio", "text", "shape"]);

const validateItem = (json) => {
  if (!validItemTypes.has(json.type)) {
    return "Item has invalid type";
  }

  if (json.type === "image" || json.type === "video" || json.type === "audio") {
    if (!json.url) {
      return "invalid value: empty url";
    }
  }
  if (json.type === "text") {
    if (!json.hasOwnProperty("text")) {
      return "missing field: text";
    }
    if (!json.color) {
      return "invalid value: empty color";
    }
  }
  if (json.type === "shape") {
    if (!json.color) {
      return "invalid value: empty color";
    }
    if (!json.shapeType) {
      return "invalid value: empty shapeType";
    }
  }
  return null;
};

const validateDataForItem = (item, data) => {
  const [key, value] = Object.entries(data)[0];
  if (key === "type") {
    return "Can't update type";
  }
  if (item.type === "image" || item.type === "video" || item.type === "audio") {
    if (key === "url" && !value) {
      return "invalid value: empty url";
    }
  }

  if (key === "color" && !value) {
    return "invalid value: empty color";
  }

  if (key === "shapeType" && !value) {
    return "invalid value: empty shapeType";
  }

  return null;
};
module.exports = {
  validateItem,
  validateDataForItem,
};
