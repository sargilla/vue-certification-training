# Form Input Bindings

Sync form inputs elements

## Input Long way

```html
<input :value="text" @input="event => text = event.target.value" />
```

## Input Short way

```html
<input v-model="text" />
```

## Textarea

```html
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

> Interpolation doesnt work in textarea

```html
<!-- bad -->
<textarea>{{ text }}</textarea>

<!-- good -->
<textarea v-model="text"></textarea>
```

## Checkbox

Simple

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

Array

```js
const checkedNames = ref([]);
```

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

## Radio

```html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

## Select

Simple

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
```

Multiple

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
</select>
```

Options can be reached with v-for

```js
const selected = ref('A');

const options = ref([
    { text: 'One', value: 'A' },
    { text: 'Two', value: 'B' },
    { text: 'Three', value: 'C' },
]);
```

```html
<select v-model="selected">
    <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
    </option>
</select>

<div>Selected: {{ selected }}</div>
```

## Value Bindings

For radio, checkbox and select options, the v-model binding values are usually static strings (or booleans for checkbox):

```html
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
    <option value="abc">ABC</option>
</select>
```

### Checkbox

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

### Radio

```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

### Select Options

Supports object values

```html
<select v-model="selected">
    <!-- inline object literal -->
    <option :value="{ number: 123 }">123</option>
</select>
```

## Modifiers

### .lazy

```html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```

### .number

Set a number value

```html
<input v-model.number="age" />
```

### .trim

Remove all white spaces before and after

```html
<input v-model.trim="msg" />
```
