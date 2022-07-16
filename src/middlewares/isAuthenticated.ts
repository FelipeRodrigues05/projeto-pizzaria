import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
  sub: string;
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // PEGA O TOKEN DO CABEÇALHO
  const authToken = req.headers.authorization;

  // SE NÃO TIVER VAI RETORNAR UM ERRO HTTP 401 (UNAUTHORIZED)
  if (!authToken) {
    return res.status(401).end()
  }

  // SEPARA O PREFIXO DO TOKEN E PEGA SOMENTE O TOKEN
  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad

    req.user_id = sub
    
    return next()

  } catch (err) {

    return res.status(401).end()
  }
}