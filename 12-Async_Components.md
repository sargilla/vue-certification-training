# Async Components

```js
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() =>
    import('./components/MyComponent.vue')
);
```

can register it globally

```js
app.component(
    'MyComponent',
    defineAsyncComponent(() => import('./components/MyComponent.vue'))
);
```

or inside parent component:

```html
<script setup>
    import { defineAsyncComponent } from 'vue';

    const AdminPage = defineAsyncComponent(() =>
        import('./components/AdminPageComponent.vue')
    );
</script>

<template>
    <AdminPage />
</template>
```

## Error States

```js
const AsyncComp = defineAsyncComponent({
    // the loader function
    loader: () => import('./Foo.vue'),

    // A component to use while the async component is loading
    loadingComponent: LoadingComponent,
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,

    // A component to use if the load fails
    errorComponent: ErrorComponent,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 3000,
});
```
