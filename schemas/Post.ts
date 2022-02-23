import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Post = list({
  fields: {
    author: relationship({
      ref: 'User.posts',
      many: false,
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    title: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      isRequired: true,
    }),
  },
});
