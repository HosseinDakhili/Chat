import jwt from 'jsonwebtoken'
const exportValidation = (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const { id = null, confirmPassword = null } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.userId = id;
    req.confirmPassword = confirmPassword
  } catch (error) {
    req.userId = null;
    req.confirmPassword = null;
  }
  next();
};

export default exportValidation;
