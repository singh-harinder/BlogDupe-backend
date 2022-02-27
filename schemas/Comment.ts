import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Comment = list({
  fields: {
    comment: text(),
    post: relationship({
      ref: 'Post.comments',
    }),
    user: relationship({
      ref: 'User.comments',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
