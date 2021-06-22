const router = require('express').Router();
const animalRoute = require('../apiRoutes/animalRoutes');
const zookeeperRoute = require('../apiRoutes/zookeeperRoutes');

router.use(animalRoute);
router.use(zookeeperRoute);

module.exports = router;