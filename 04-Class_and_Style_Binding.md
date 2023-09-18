# Class and Style Bindings

## Binding Classes

### Binding to objects

```html
<div :class="{ active: isActive }"></div>
```

to multiple classes

```js
const isActive = ref(true);
const hasError = ref(false);
```

```html
<div
    class="static"
    :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

renders:

```html
<div class="static active"></div>
```

can be external object

```js
const classObject = reactive({
    active: true,
    'text-danger': false,
});
```

```html
<div :class="classObject"></div>
```

or a computed that returns an object

```js
const isActive = ref(true);
const error = ref(null);

const classObject = computed(() => ({
    active: isActive.value && !error.value,
    'text-danger': error.value && error.value.type === 'fatal',
}));
```

```html
<div :class="classObject"></div>
```

### Binding to Array

```js
const activeClass = ref('active');
const errorClass = ref('text-danger');
```

```html
<div :class="[activeClass, errorClass]"></div>
```

can use ternary expression

```html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

also can use objects inside an array

```html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### With components

```html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

```html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

it renders

```html
<p class="foo bar baz boo">Hi!</p>
```

also can use class bindings

```html
<MyComponent :class="{ active: isActive }" />
```

If your component has multiple root elements, you would need to define which element will receive this class. You can do this using the $attrs component property:

```html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

## Binding Inline Styles

```js
const activeColor = ref('red');
const fontSize = ref(30);
```

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

also supports kebab-case

```html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

### Binding to arrays

```html
<div :style="[baseStyles, overridingStyles]"></div>
```
