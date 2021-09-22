import { Request, Response, NextFunction } from "express"

interface Params {
  req: Request,
  res: Response,
  next: NextFunction
}

export function ensureUser(args: Params): void {
      if (args.req.isAuthenticated()) {
        return args.next()
      } else {
        args.res.redirect('/')
      }
}

export function ensureGuest (args: Params): void{
      if (!args.req.isAuthenticated()) {
        return args.next();
      } else {
        args.res.redirect('/dashboard')
      }
}

export function ensureAdmin (args: Params): void {
        if(args.req.body.role == 'admin') {
            return args.next()
        } else {
            args.res.status(401).json({ error: 'Unauthorized Access Attempt has been blocked.' }).redirect('/401')
        }
}