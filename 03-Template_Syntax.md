# Template Syntax

## Text Interpolation

```html
<span>Message: {{ msg }}</span>
```

## Raw Html

```html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

Using text interpolation: `<span style="color: red">This should be red.</span>`

Using v-html directive: This should be red.

## Bindings

```html
<div v-bind:id="dynamicId"></div>
// o
<div :id="dynamicId"></div>
```

## Boolean Attributes

```html
<button :disabled="isButtonDisabled">Button</button>
```

## Binding multiple attributes

```js
const objectOfAttrs = {
    id: 'container',
    class: 'wrapper',
};
```

```html
<div v-bind="objectOfAttrs"></div>
```

## Using Js Expressions

```html
{{ number + 1 }} {{ ok ? 'YES' : 'NO' }} {{ message.split('').reverse().join('')
}}

<div :id="`list-${id}`"></div>
```

## Calling functions

```html
<time :title="toTitleDate(date)" :datetime="date">
    {{ formatDate(date) }}
</time>
```

> Functions called inside binding expressions will be called every time the component updates, so they should not have any side effects

## Directives

Directives are special attributes with the v- prefix.
(as v-html or v-bind seed before)

### v-if

```html
<p v-if="seen">Now you see me</p>
```

### Arguments

```html
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

### v-on

```html
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
```

## Dynamic Arguments

```html
<!--
Note that there are some constraints to the argument expression,
as explained in the "Dynamic Argument Value Constraints" and "Dynamic Argument Syntax Constraints" sections below.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething"></a>
```

## Modifiers

.prevent same e.preventDefault()

```html
<form @submit.prevent="onSubmit">...</form>
```
