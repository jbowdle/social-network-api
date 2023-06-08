const router = require("express").Router();
const { 
  getThoughts,
  createThought,
  getSingleThought,
  createReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;