# Vue Router

To create SPA

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
    <h1>Hello App!</h1>
    <p>
        <!-- use the router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
</div>
```

```js
// 1. Define route components.
// These can be imported from other files
const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
});

// 5. Create and mount the root instance.
const app = Vue.createApp({});
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app');

// Now the app has started!
```

## Dynamic Route Matching with Params

```js
const User = {
    template: '<div>User {{ $route.params.id }}</div>',
};

// these are passed to `createRouter`
const routes = [
    // dynamic segments start with a colon
    { path: '/users/:id', component: User },
];
```

## Catch all / 404 Not found Route

```js
const routes = [
    // will match everything and put it under `$route.params.pathMatch`
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // will match anything starting with `/user-` and put it under `$route.params.afterUser`
    { path: '/user-:afterUser(.*)', component: UserGeneric },
];
```

## Programmatic Navigation

```js
// literal string path
router.push('/users/eduardo');

// object with path
router.push({ path: '/users/eduardo' });

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } });

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } });

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' });
```

## Traverse history

```js
// go forward by one record, the same as router.forward()
router.go(1);

// go back by one record, the same as router.back()
router.go(-1);

// go forward by 3 records
router.go(3);

// fails silently if there aren't that many records
router.go(-100);
router.go(100);
```

# Named Routes

```js
const routes = [
    {
        path: '/user/:username',
        name: 'user',
        component: User,
    },
];
```

```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
    User
</router-link>
```

# Named Views

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

```js
onst router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

# Redirect

```js
const routes = [{ path: '/home', redirect: '/' }];
```

relative redirect

```js
const routes = [
    {
        // will always redirect /users/123/posts to /users/123/profile
        path: '/users/:id/posts',
        redirect: (to) => {
            // the function receives the target route as the argument
            // a relative location doesn't start with `/`
            // or { path: 'profile'}
            return 'profile';
        },
    },
];
```

## Passing Props to Route Components

```js
const User = {
    // make sure to add a prop named exactly like the route param
    props: ['id'],
    template: '<div>User {{ id }}</div>',
};
const routes = [{ path: '/user/:id', component: User, props: true }];
```

# Navigation guards

```js
router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' };
    }
});
```

with promises

```js
router.beforeEach(async (to, from) => {
    // canUserAccess() returns `true` or `false`
    const canAccess = await canUserAccess(to);
    if (!canAccess) return '/login';
});
```

## Route Meta Fields

```js
const routes = [
    {
        path: '/posts',
        component: PostsLayout,
        children: [
            {
                path: 'new',
                component: PostsNew,
                // only authenticated users can create posts
                meta: { requiresAuth: true },
            },
            {
                path: ':id',
                component: PostsDetail,
                // anybody can read a post
                meta: { requiresAuth: false },
            },
        ],
    },
];
```

```js
router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        };
    }
});
```

## Lazy load routes

```js
// replace
// import UserDetails from './views/UserDetails'
// with
const UserDetails = () => import('./views/UserDetails.vue');

const router = createRouter({
    // ...
    routes: [{ path: '/users/:id', component: UserDetails }],
});
```

### Grouping Components in the Same Chunk

```js
const UserDetails = () =>
    import(/* webpackChunkName: "group-user" */ './UserDetails.vue');
const UserDashboard = () =>
    import(/* webpackChunkName: "group-user" */ './UserDashboard.vue');
const UserProfileEdit = () =>
    import(/* webpackChunkName: "group-user" */ './UserProfileEdit.vue');
```
