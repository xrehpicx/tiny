import type { GlobalConfig } from 'payload'

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Tiny Leaf Co.',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Handcrafted, artistic, and symbolic home décor planters and accessories. Creative terracotta and waterproof planters with themes ranging from animals to spiritual motifs.',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Merging artistic expression with functionality in home décor',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'person',
          type: 'text',
          required: true,
          defaultValue: 'Simran Sultana',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '8296869270',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'simransultana119@gmail.com',
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
          defaultValue: '@tinyleaf',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'facebook',
          type: 'text',
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'keywords',
          type: 'text',
          defaultValue: 'planters, home decor, terracotta, handcrafted, artistic, symbolic, Buddha pot, elephant planter, spiritual decor, waterproof planters',
        },
        {
          name: 'author',
          type: 'text',
          defaultValue: 'Tiny Leaf Co.',
        },
      ],
    },
  ],
}
