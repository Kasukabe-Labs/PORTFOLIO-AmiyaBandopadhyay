import { Mongoose } from 'mongoose';

declare global {
  // This extends the global NodeJS namespace to include our mongoose cache
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      };
    }
  }
}

// This export is needed for TypeScript to treat this as a module
export { };
