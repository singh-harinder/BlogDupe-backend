import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, checkbox } from '@keystone-next/fields';

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({
      isRequired: true,
      isUnique: true,
    }),
    password: password({
      isRequired: true,
    }),
    isAdmin: checkbox({
      isRequired: true,
      label: 'Admin',
      defaultValue: false,
    }),
    image: relationship({
      ref: 'ProfileImage.photo',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {
          fields: ['image', 'altText'],
        },
        inlineEdit: {
          fields: ['image', 'altText'],
        },
      },
    }),
    posts: relationship({
      ref: 'Post.author',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['title'],
      },
    }),
    location: text({
      isRequired: false,
    }),
    skills: text({}),
    hobbies: text({}),
    comments: relationship({
      ref: 'Comment.user',
      many: true,
    }),
  },
});
