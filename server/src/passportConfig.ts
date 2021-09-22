const GitHubStrategy = require('passport-github2').Strategy
import { User } from './models/user';
import dotenv from 'dotenv';
import { Authenticator } from 'passport';
import { Profile } from 'passport-github2';
dotenv.config();

const githubPassport = (passport: Authenticator) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/github/callback`,
      }, 
      async (profile: Profile, done: any) => {
        console.log('OAuth system has started');
        try {
          const user = await User.findOne({ githubId: profile.id });
          console.log('Searching through users...');
          if (user) {
            done(null, user);
            console.log(
              'Signed in, since there is already an account for this user.'
            );
          } else {
            const newUser = await new User({
              githubId: profile.id,
              displayName: profile.displayName,
            }).save();
            if (newUser) {
              done(null, newUser);
              console.log('Created a new user');
            } else {
              console.log('Could not create a new user');
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserialize started');
    User.findById(id, (err: any, user: any) => {
      if (err) {
        console.log('deserialize error');
        console.log(err)
        done(null, false)
      } else {
        console.log('deserialize successful');
        done(null, user);
      }
    });
  });
};

export default githubPassport;
