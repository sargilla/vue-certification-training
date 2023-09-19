# Transitions

**`<Transition>`** is a built-in component, it can be used to apply enter and leave animations on elements.
To enter or leave can be applied on:

-   v-if
-   v-show
-   component special element
-   changing key attribute

```html
<button @click="show = !show">Toggle</button>
<Transition>
    <p v-if="show">hello</p>
</Transition>
```

```css
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
```

## Transitions Classes

![css-base-transitions](https://vuejs.org/assets/transition-classes.f0f7b3c9.png)

## Named Transitions

```html
<Transition name="fade"> ... </Transition>
```

```css
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
```

## CSS Animations

Simply declare them under the _-enter-active and _-leave-active classe

```html
<Transition name="bounce">
    <p v-if="show" style="text-align: center;">
        Hello here is some bouncy text!
    </p>
</Transition>
```

```css
.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}
```

## Using Transitions and Animations Together

```html
<Transition type="animation">...</Transition>
```

## Transition duration

```html
<Transition :duration="550">...</Transition>
```

```html
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

## JavaScript Hooks

```html
<Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
>
    <!-- ... -->
</Transition>
```

```js
// called before the element is inserted into the DOM.
// use this to set the "enter-from" state of the element
function onBeforeEnter(el) {}

// called one frame after the element is inserted.
// use this to start the entering animation.
function onEnter(el, done) {
    // call the done callback to indicate transition end
    // optional if used in combination with CSS
    done();
}

// called when the enter transition has finished.
function onAfterEnter(el) {}

// called when the enter transition is cancelled before completion.
function onEnterCancelled(el) {}

// called before the leave hook.
// Most of the time, you should just use the leave hook
function onBeforeLeave(el) {}

// called when the leave transition starts.
// use this to start the leaving animation.
function onLeave(el, done) {
    // call the done callback to indicate transition end
    // optional if used in combination with CSS
    done();
}

// called when the leave transition has finished and the
// element has been removed from the DOM.
function onAfterLeave(el) {}

// only available with v-show transitions
function onLeaveCancelled(el) {}
```

When using JavaScript-only transitions add the :css="false"

```html
<Transition ... :css="false"> ... </Transition>
```

## Reusable Transitions

```html
<!-- MyTransition.vue -->
<script>
    // JavaScript hooks logic...
</script>

<template>
    <!-- wrap the built-in Transition component -->
    <Transition name="my-transition" @enter="onEnter" @leave="onLeave">
        <slot></slot>
        <!-- pass down slot content -->
    </Transition>
</template>

<style>
    /*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
</style>
```

```html
<MyTransition>
    <div v-if="show">Hello</div>
</MyTransition>
```

## Transition Between Elements

```html
<Transition>
    <button v-if="docState === 'saved'">Edit</button>
    <button v-else-if="docState === 'edited'">Save</button>
    <button v-else-if="docState === 'editing'">Cancel</button>
</Transition>
```

## Transition Modes

```html
<Transition mode="out-in"> ... </Transition>
```

`<Transition>` also supports mode="in-out", although it's much less frequently used.

## Transition Between Components

```html
<Transition name="fade" mode="out-in">
    <component :is="activeComponent"></component>
</Transition>
```

# TransitionGroup

## Differences from `<Transition>`

-   By default, it doesn't render a wrapper element. But you can specify an element to be rendered with the tag prop.
-   Transition modes are not available
-   Elements inside are always required to have a unique key attribute
-   CSS transition classes will be applied to individual elements in the list, not to the group / container itsel

```html
<TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
</TransitionGroup>
```

```css
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
```
