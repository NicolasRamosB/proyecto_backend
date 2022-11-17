
const existCart = (cart) => {
    return async (req, res, next) => {
      const { id } = req.params;
  
      const current = await cart.getbyId(Number(id));
      
      if (current) {
        req.cart = current;
        return next();
      }
  
      res.status(400).json({
        success: false,
        error: `Cart not found.`,
      });
    };
  };
  
  module.exports = existCart;