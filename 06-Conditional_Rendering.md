# Conditional rendering

## v-if

The block will only be rendered if the directive's expression returns a truthy value.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

## v-else

```html
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

## v-else-if

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

## v-if on template

```html
<template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</template>
```

## v-show

> v-sho will always be rendered and remain in the DOM,only toggles the display CSS property of the element (none)

v-show doesn't support the **_template_** element, nor does it work with v-else

```html
<h1 v-show="ok">Hello!</h1>
```

> Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs.

# v-if with v-for

When v-if and v-for are both used on the same element, v-if will be evaluated first.
