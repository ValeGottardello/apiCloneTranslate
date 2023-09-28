
export function refererCheck(req, res, next) {
    
    const referer = req.get('Referer');
    const allowedReferer = `${process.env.CLIENT}`;
    
    if (referer === allowedReferer) {
      return next();
    } else {
      throw new Error('Not allowed');
    }
}