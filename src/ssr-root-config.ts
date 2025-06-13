import { registerApplication, start, LifeCycles } from 'single-spa';

// Admin module - handles admin routes
registerApplication({
  name: '@ssr/admin',
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      '@ssr/admin'
    ),
  activeWhen: ['/'],
});

// Feed module - handles feed/home routes
registerApplication({
  name: '@ssr/feed',
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      '@ssr/feed'
    ),
  activeWhen: ['/'],
});

// Users module - handles user-related routes
registerApplication({
  name: '@ssr/users',
  app: () =>
    import(
      /* webpackIgnore: true */ // @ts-ignore-next
      '@ssr/users'
    ),
  activeWhen: ['/'],
});

start({
  urlRerouteOnly: true,
});
