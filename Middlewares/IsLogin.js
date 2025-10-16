const isLogin = (req, res, next) => {
 if (!req.userId || !req.confirmPassword) {
   return res.status(401).json({
     success: false,
     message: "You need to be logged in to access this route",
   });
 }
 next();
};

export default isLogin;
