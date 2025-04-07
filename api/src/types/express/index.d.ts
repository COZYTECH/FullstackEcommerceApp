// Extend the Request interface to include cleanBody

export {};
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      cleanBody?: any; // Use a more specific type if possible
    }
  }
}
