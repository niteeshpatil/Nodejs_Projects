const genrateMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const genratelocation = (url) => {
  return {
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = { genrateMessage, genratelocation };
