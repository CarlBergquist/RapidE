const router = require('express').Router();
const { Product, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbProductData = await Product.findAll({
          include: [
            {
              model: Product,
              attributes: ['productName', 'description'],
            },
          ],
        });
    
        const prodcuts = dbProductData.map((prodcuts) =>
          prodcuts.get({ plain: true })
        );
        // Send over the 'loggedIn' session variable to the 'homepage' template
        res.render('homepage', {
          prodcuts,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }

})

module.exports = router;