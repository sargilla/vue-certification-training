# Plugins

Plugins are self-contained code that usually add app-level functionality to Vue

```js
import { createApp } from 'vue';

const app = createApp({});

app.use(myPlugin, {
    /* optional options */
});
```

A plugin is defined as either an object that exposes an install() method

```js
const myPlugin = {
    install(app, options) {
        // configure the app
    },
};
```

There is no strictly defined scope for a plugin, but common scenarios where plugins are useful include:

-   Register one or more global components or custom directives with app.component() and app.directive().

-   Make a resource injectable throughout the app by calling app.provide().

-   Add some global instance properties or methods by attaching them to app.config.globalProperties.

-   A library that needs to perform some combination of the above (e.g. vue-router).

## Writing a Plugin

We want to create a translation function.

```html
<h1>{{ $translate('greetings.hello') }}</h1>
```

```js
// plugins/i18n.js
export default {
    install: (app, options) => {
        // inject a globally available $translate() method
        app.config.globalProperties.$translate = (key) => {
            // retrieve a nested property in `options`
            // using `key` as the path
            return key.split('.').reduce((o, i) => {
                if (o) return o[i];
            }, options);
        };
    },
};
```

instalation:

```js
import i18nPlugin from './plugins/i18n';

app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!',
    },
});
```

`$translate('greetings.hello')` will be replaced by Bonjour! at runtime.

## Provide / Inject with Plugins

Plugins also allow us to use inject to provide a function or attribute to the plugin's users

```js
// plugins/i18n.js
export default {
    install: (app, options) => {
        app.config.globalProperties.$translate = (key) => {
            return key.split('.').reduce((o, i) => {
                if (o) return o[i];
            }, options);
        };

        app.provide('i18n', options);
    },
};
```

users can do:

```html
<script setup>
    import { inject } from 'vue';

    const i18n = inject('i18n');

    console.log(i18n.greetings.hello);
</script>
```
