/*
 * some comment are mine and others from original assignment
*/

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

import User from '../models/user_model';

// COMMENT EACH OF THE DONE TO SHOW WHAT IT IS DOING

// loads in .env file if needed
dotenv.config({ silent: true });

// setting options to use email as the username
const localOptions = { usernameField: 'email' };

// kept from original commenting
// options for jwt strategy
// we'll pass in the jwt in an `authorization` header
// so passport can find it there
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

// email and password authentification
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  let user;
  let isMatch;

  // looks for the user from inputed email
  try {
    user = await User.findOne({ email });
    isMatch = await user.comparePassword(password);
  } catch (error) {
    return done(error);
  }

  // throw an error if the email and passwords do not match any users
  if (!user) {
    return done(null, false);
  } else if (!isMatch) {
    return done(null, false);
  } else {
    return done(null, user);
  }
});

// jwt logging in the user
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  let user;
  try {
    user = await User.findById(payload.sub);
  } catch (error) {
    done(error, false);
  }
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

// Tell passport to use this strategy
passport.use(jwtLogin); // for 'jwt'
passport.use(localLogin); // for 'local'

// middleware functions to use in routes
export const requireAuth = passport.authenticate('jwt', { session: false });
export const requireSignin = passport.authenticate('local', { session: false });
