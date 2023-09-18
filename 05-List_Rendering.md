# List Rendering

## v-for

```js
const items = ref([{ message: 'Foo' }, { message: 'Bar' }]);
```

```html
<li v-for="item in items">{{ item.message }}</li>
```

supports parent scope and index

```js
const parentMessage = ref('Parent');
const items = ref([{ message: 'Foo' }, { message: 'Bar' }]);
```

```html
<li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

renders
Parent - 0 - Foo
Parent - 1 - Bar

### v-for with an object

```js
const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10',
});
```

```html
<li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
</li>
```

### v-for with a range

```html
<span v-for="n in 10">{{ n }}</span>
```

### v-for on template

render a block of multiple element

```html
<ul>
    <template v-for="item in items">
        <li>{{ item.msg }}</li>
        <li class="divider" role="presentation"></li>
    </template>
</ul>
```

### v-for with v-if

> It's not recommended to use v-if and v-for on the same element

```html
<template v-for="todo in todos">
    <li v-if="!todo.isComplete">{{ todo.name }}</li>
</template>
```

### Maintaining State with key

you need to provide a unique key attribute for each item

```html
<template v-for="todo in todos" :key="todo.name">
    <li>{{ todo.name }}</li>
</template>
```

### v-for with a Component

```html
<MyComponent
    v-for="(item, index) in items"
    :item="item"
    :index="index"
    :key="item.id"
/>
```
