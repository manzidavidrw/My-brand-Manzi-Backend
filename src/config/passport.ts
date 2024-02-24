import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/User';


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_secret_key' // Replace with your secret key
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload.sub);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;
