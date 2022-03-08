module.exports = (app) => {
  const favourite = require("../controllers/favourite.controller.js");
  app.post("/favourites/add", favourite.create);

  app.get("/favourites", favourite.findAll);

  app.get("/favourites/:id", favourite.findOne);

  app.get("/favourites/teacher/:id", favourite.findByteacher);

  app.get("/favourites/user/:id", favourite.findByUser);

  app.delete("/favourites", favourite.delete);
};
