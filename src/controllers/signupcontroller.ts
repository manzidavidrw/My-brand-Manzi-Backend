import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import UserModel from '../models/User';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('signup', { session: false }, async (err: any, user: any, info: { message: any; }) => {
    try {
      if (err || !user) {
        return res.status(400).json({ message: info?.message || 'Signup failed' });
      }
      res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
