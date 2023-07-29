import { Request, Response, NextFunction } from 'express';
import { checkIsAdmin } from '../resources/auth/auth.service';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.uid && (await checkIsAdmin(req.session.uid))) next();
  else res.status(403).json({ msg: 'Não autorizado' });
};

export default isAdmin;
