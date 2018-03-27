<style lang="scss">

    $buttons-spacing: 8px;

    .timer-button {
        cursor: pointer;
        font-family: 'Comfortaa', cursive;
        margin: $buttons-spacing;
        padding: $buttons-spacing * 2;
        border-radius: $buttons-spacing / 2;
        color: #2b1100;
        background: #e09d72;
        border: none;
        outline: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: #a1622b;
        }

    }

</style>

<template>

    <div
        class="timer-button size-large"
        @click="$emit('click')"
    >
        {{ timer.durationForHumans }}

        <!-- TODO
        <div class="buttons">

            <a class="button">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </a>

            <a class="button">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>

        </div>
        -->

    </div>

</template>

<script lang="ts">

    import Vue          from 'vue';
    import Component    from 'vue-class-component';

    @Component({
        props: [ 'timer' ]
    })
    export default class TimerButton extends Vue {

    }

</script>
