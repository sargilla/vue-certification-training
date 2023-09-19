# Watchers

Watch observes 3 types of reactive sources:

```js
const x = ref(0);
const y = ref(0);

// single ref
watch(x, (newX) => {
    console.log(`x is ${newX}`);
});

// getter
watch(
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`);
    }
);

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`);
});
```

For reactive objects it needs a getter way:

```js
const obj = reactive({ count: 0 });
watch(
    () => obj.count,
    (count) => {
        console.log(`count is: ${count}`);
    }
);
```

## Deep Watchers

you can watch the entire object

```js
const obj = reactive({ count: 0 });

watch(obj, (newValue, oldValue) => {
    // fires on nested property mutations
    // Note: `newValue` will be equal to `oldValue` here
    // because they both point to the same object!
});

obj.count++;
```

if is an object you need add `{deep:true}`

```js
watch(
    () => state.someObject,
    (newValue, oldValue) => {
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
    },
    { deep: true }
);
```

> Deep watch requires traversing all nested properties in the watched object, and can be expensive when used on large data structures. Use it only when necessary and beware of the performance implications.

## Eager Watchers

watch is lazy by default: the callback won't be called until the watched source has changed

We can force a watcher's callback to be executed immediately by passing the immediate: true option:

```js
watch(
    source,
    (newValue, oldValue) => {
        // executed immediately, then again when `source` changes
    },
    { immediate: true }
);
```

## watchEffect()

shorthand for when you use the same reactive state in the callback

instead this:

```js
const todoId = ref(1);
const data = ref(null);

watch(
    todoId,
    async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
        );
        data.value = await response.json();
    },
    { immediate: true }
);
```

you can do:

```js
watchEffect(async () => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    );
    data.value = await response.json();
});
```

## watch vs. watchEffect

watch and watchEffect both allow us to reactively perform side effects. Their main difference is the way they track their reactive dependencies:

-   **watch** only tracks the explicitly watched source. (not callback).

-   **watchEffect** combines dependency tracking and side effect into one phase. It automatically tracks every reactive property accessed during its synchronous execution.

## Stopping a Watcher

```js
const unwatch = watchEffect(() => {});

// ...later, when no longer needed
unwatch();
```

## void error on start

```js
// data to be loaded asynchronously
const data = ref(null);

watchEffect(() => {
    if (data.value) {
        // do something when data is loaded
    }
});
```
