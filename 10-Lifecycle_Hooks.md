# Lifecycle Hooks

## Registering Lifecycle Hooks

OnMounted is fired when component has finished the initial rendering

```html
<script setup>
    import { onMounted } from 'vue';

    onMounted(() => {
        console.log(`the component is now mounted.`);
    });
</script>
```

the most commonly used being **_onMounted_**, **_onUpdated_**, and **_onUnmounted_**

## Lifecycle Diagram

!['diagrama'](https://vuejs.org/assets/lifecycle.16e4c08e.png)
