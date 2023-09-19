# Components Basics

## Defining a Component

.vue extension file:

```html
<script setup>
    import { ref } from 'vue';

    const count = ref(0);
</script>

<template>
    <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

.js file:

```js
import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);
        return { count };
    },
    template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`,
    // Can also target an in-DOM template:
    // template: '#my-template-element'
};
```

## Using a Component

```html
<script setup>
    import ButtonCounter from './ButtonCounter.vue';
</script>

<template>
    <h1>Here is a child component!</h1>
    <ButtonCounter />
</template>
```

## Global Registration

```js
import MyComponent from './App.vue';
// after createApp()
app.component('MyComponent', MyComponent);
```

## Passing Props

```html
<!-- BlogPost.vue -->
<script setup>
    defineProps(['title']);
</script>

<template>
    <h4>{{ title }}</h4>
</template>
```

in js can access:

```js
const props = defineProps(['title']);
console.log(props.title);
```

## Passing data to components

```js
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

with v-for

```js
const posts = ref([
    { id: 1, title: 'My journey with Vue' },
    { id: 2, title: 'Blogging with Vue' },
    { id: 3, title: 'Why Vue is so fun' },
]);
```

can do:

```js
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

## Listening to Events

To communicate with the parent component
ref with data to change:

```js
const posts = ref([
    /* ... */
]);

const postFontSize = ref(1);
```

Listen for enlarge-text event:

```html
<div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        @enlarge-text="postFontSize += 0.1"
    />
</div>
```

Emit enlarge-text event when click the button

```html
<!-- BlogPost.vue, omitting <script> -->
<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <button @click="$emit('enlarge-text')">Enlarge text</button>
    </div>
</template>
```

### Event Arguments

```html
<button @click="$emit('increaseBy', 1)">Increase by 1</button>
```

function in component:

```html
<MyButton @increase-by="(n) => count += n" />
```

or handler method

```html
<MyButton @increase-by="increaseCount" />
```

```js
function increaseCount(n) {
    count.value += n;
}
```

### Declaring Emitted Events

```html
<script setup>
    defineEmits(['inFocus', 'submit']);
</script>
```

The $emit method that we used in the template tag isn't accessible within the script-setup section of a component, but defineEmits() returns an equivalent function that we can use instead:

```html
<script setup>
    const emit = defineEmits(['inFocus', 'submit']);

    function buttonClick() {
        emit('submit');
    }
</script>
```

## Content Distribution with Slots

```html
<AlertBox> Something bad happened. </AlertBox>
```

```js
<template>
    <div class="alert-box">
        <strong>This is an Error for Demo Purposes</strong>
        <slot />
    </div>
</template>
```

## Dynamic Components

Vue's <component> element with the special is attribute:

```html
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

:is can contain either:

-   the name string of a registered component
-   the actual imported component object

You can also use the is attribute to create regular HTML elements.
