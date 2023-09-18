## Creating a Vue Application

options to creating a Vue.js

-   Vue SPA
-   CDN
-   The application Instance

### SPA

Creating proyect

```shell
npm create vue@latest
```

To development

```shell
 cd <your-project-name>
 npm install
 npm run dev
```

To production

```shell
npm run build
```

### CDN

You can use Vue directly from a CDN via a script tag:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

#### Using Global build:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
    const { createApp, ref } = Vue;

    createApp({
        setup() {
            const message = ref('Hello vue!');
            return {
                message,
            };
        },
    }).mount('#app');
</script>
```

#### Using ES module

```html
<div id="app">{{ message }}</div>

<script type="module">
    import {
        createApp,
        ref,
    } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

    createApp({
        setup() {
            const message = ref('Hello Vue!');
            return {
                message,
            };
        },
    }).mount('#app');
</script>
```

#### Enabling Import maps

```html
<script type="importmap">
    {
        "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        }
    }
</script>

<div id="app">{{ message }}</div>

<script type="module">
    import { createApp, ref } from 'vue';

    createApp({
        setup() {
            const message = ref('Hello Vue!');
            return {
                message,
            };
        },
    }).mount('#app');
</script>
```

#### Splitting Up the Modules

```html
<!-- index.html -->
<div id="app"></div>

<script type="module">
    import { createApp } from 'vue';
    import MyComponent from './my-component.js';

    createApp(MyComponent).mount('#app');
</script>
```

```js
// my-component.js
import { ref } from 'vue';
export default {
    setup() {
        const count = ref(0);
        return { count };
    },
    template: `<div>count is {{ count }}</div>`,
};
```

### The Application Instance

Every Vue application starts by creating a new application instance with the createApp function:

```js
import { createApp } from 'vue';

const app = createApp({
    /* root component options */
});
```

#### The root component

The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.

```js
import { createApp } from 'vue';
// import the root component App from a single-file component.
import App from './App.vue';

const app = createApp(App);
```

#### Mounting the App

```html
<div id="app"></div>
```

```js
app.mount('#app');
```

#### App Configurations

```js
app.config.errorHandler = (err) => {
    /* handle error */
};
```

#### Multiple Instances

```js
const app1 = createApp({
    /* ... */
});
app1.mount('#container-1');

const app2 = createApp({
    /* ... */
});
app2.mount('#container-2');
```
