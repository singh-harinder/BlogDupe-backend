import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Post } from './schemas/Post';
import { ProfileImage } from './schemas/ProfileImage';
import { Comment } from './schemas/Comment';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
    },
    lists: createSchema({
      User,
      Post,
      ProfileImage,
      Comment,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        if (
          session?.data?.isAdmin ||
          session?.data?.email === 'kinggouken611@gmail.com'
        ) {
          return true;
        }
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email isAdmin',
    }),
  })
);
