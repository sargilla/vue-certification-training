# Template Refs

**Refs** allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted

```js
<input ref="input">
```

Accessing refs:

```html
<script setup>
    import { ref, onMounted } from 'vue';

    // declare a ref to hold the element reference
    // the name must match template ref value
    const input = ref(null);

    onMounted(() => {
        input.value.focus();
    });
</script>

<template>
    <input ref="input" />
</template>
```

> Note that you can only access the ref after the component is mounted.

# Refs inside v-for

```html
<script setup>
    import { ref, onMounted } from 'vue';

    const list = ref([
        /* ... */
    ]);

    const itemRefs = ref([]);

    onMounted(() => console.log(itemRefs.value));
</script>

<template>
    <ul>
        <li v-for="item in list" ref="itemRefs">{{ item }}</li>
    </ul>
</template>
```

## Ref on Component

With this the parent component will have full access to every property and method of the child component

```html
<script setup>
    import { ref, onMounted } from 'vue';
    import Child from './Child.vue';

    const child = ref(null);

    onMounted(() => {
        // child.value will hold an instance of <Child />
    });
</script>

<template>
    <Child ref="child" />
</template>
```
