const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

router.use('/', (err, req, res, next) => {
  if (err.status === 401) {
    res.status(err.status);
    res.json(err.errors);

  } else if ((err.errors && err.errors.startDate) || (err.errors && err.errors.endDate)) {
    res.status(err.status);
    const errMessage = {
      "Message": err.message,
      "Errors": err.errors
    }
    res.json(errMessage);

  } else if (err.status === 403) {
    res.status(err.status);
    res.json(
      {
        "message": err.message
      }
    )
  } else {
    next(err)
  }
});

module.exports = router;
