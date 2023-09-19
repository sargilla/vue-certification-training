# Single-File Components

Vue Single-File Components **_(a.k.a. _.vue files, abbreviated as SFC)\*** is a special file format that allows us to encapsulate the template

```html
<script setup>
    import { ref } from 'vue';
    const greeting = ref('Hello World!');
</script>

<template>
    <p class="greeting">{{ greeting }}</p>
</template>

<style>
    .greeting {
        color: red;
        font-weight: bold;
    }
</style>
```

use:

```js
import MyComponent from './MyComponent.vue';

export default {
    components: {
        MyComponent,
    },
};
```
