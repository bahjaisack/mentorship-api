export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        message: `Access Denied : Requires one of [${roles.join(",")}]`,
      });
    }
    next();
  };
};
