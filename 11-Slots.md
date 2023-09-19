# Slots

Use:

```html
<FancyButton>
    Click me!
    <!-- slot content -->
</FancyButton>
```

Template:

```html
<button class="fancy-btn">
    <slot></slot>
    <!-- slot outlet -->
</button>
```

Slot content rendered:
![slot](https://vuejs.org/assets/slots.dbdaf1e8.png)

# Fallback Content

```html
<button type="submit">
    <slot>
        Submit
        <!-- fallback content -->
    </slot>
</button>
```

```html
<SubmitButton />
```

it renders:

```html
<button type="submit">Submit</button>
```

but you can override:

```html
<SubmitButton>Save</SubmitButton>
```

it renders

```html
<button type="submit">Save</button>
```

## Named Slots

```html
<div class="container">
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
</div>
```

con #default

```html
<BaseLayout>
    <!-- v-slot directive -->
    <template v-slot:header>
        <h1>Here might be a page title</h1>
    </template>
    <!-- default slot -->
    <template #default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
    </template>
    <!-- short-hand -->
    <template #footer>
        <p>Here's some contact info</p>
    </template>
</BaseLayout>
```

mas simple

```html
<BaseLayout>
    <template #header>
        <h1>Here might be a page title</h1>
    </template>

    <!-- implicit default slot -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template #footer>
        <p>Here's some contact info</p>
    </template>
</BaseLayout>
```

## Dynamic Slot Names

```html
<base-layout>
    <template v-slot:[dynamicSlotName]> ... </template>

    <!-- with shorthand -->
    <template #[dynamicSlotName]> ... </template>
</base-layout>
```
