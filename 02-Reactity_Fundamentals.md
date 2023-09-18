# Reactivity Fundamentals

## Declaring Reactive State

### ref()

```js
import { ref } from 'vue';

const count = ref(0);
```

```js
const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

#### setup function

```js
import { ref } from 'vue';

export default {
    // `setup` is a special hook dedicated for the Composition API.
    setup() {
        const count = ref(0);

        // expose the ref to the template
        return {
            count,
        };
    },
};
```

```html
<div>{{ count }}</div>
```

Event handlers:

```html
<button @click="count++">{{ count }}</button>
```

With function:

```js
import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);

        function increment() {
            // .value is needed in JavaScript
            count.value++;
        }

        // don't forget to expose the function as well.
        return {
            count,
            increment,
        };
    },
};
```

> No olvidar de retornar las funciones y referencias de los metodos usados en el template

#### Script Setup

```html
<script setup>
    import { ref } from 'vue';

    const count = ref(0);

    function increment() {
        count.value++;
    }
</script>

<template>
    <button @click="increment">{{ count }}</button>
</template>
```

#### Deep reactivity

```js
import { ref } from 'vue';

const obj = ref({
    nested: { count: 0 },
    arr: ['foo', 'bar'],
});

function mutateDeeply() {
    // these will work as expected.
    obj.value.nested.count++;
    obj.value.arr.push('baz');
}
```

#### DOM Update Timing

To wait for the DOM update to complete after a state change, you can use the nextTick() global API:

```js
import { nextTick } from 'vue';

async function increment() {
    count.value++;
    await nextTick();
    // Now the DOM is updated
}
```

#### Typing ref()

```js
import { ref } from 'vue';
import type { Ref } from 'vue';

const year: Ref<string | number> = ref('2020');

year.value = 2020; //
```

### reactive()

reactive() makes an object itself reactive:

```js
import { reactive } from 'vue';

const state = reactive({ count: 0 });
```

```html
<button @click="state.count++">{{ state.count }}</button>
```

#### Limitations of reactive()

**Limited value types:** it only works for object types (objects, arrays, and collection types such as Map and Set). It cannot hold primitive types such as string, number or boolean.

**Cannot replace entire object:** since Vue's reactivity tracking works over property access, we must always keep the same reference to the reactive object.

```js
let state = reactive({ count: 0 });

// the above reference ({ count: 0 }) is no longer being tracked
// (reactivity connection is lost!)
state = reactive({ count: 1 });
```

**Not destructure-friendly:** when we destructure a reactive object's primitive type property into local variables, or when we pass that property into a function, we will lose the reactivity connection:

```js
const state = reactive({ count: 0 });

// count is disconnected from state.count when destructured.
let { count } = state;
// does not affect original state
count++;

// the function receives a plain number and
// won't be able to track changes to state.count
// we have to pass the entire object in to retain reactivity
callSomeFunction(state.count);
```

#### Caveats in Arrays y Collections

```js
const books = reactive([ref('Vue 3 Guide')]);
// need .value here
console.log(books[0].value);

const map = reactive(new Map([['count', ref(0)]]));
// need .value here
console.log(map.get('count').value);
```

#### Typing reactive()

```js
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```
