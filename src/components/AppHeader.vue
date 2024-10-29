<script>

export default {
    name: 'AppHeader',

    data() {
        return {

        }
    }
}
</script>

<template>
    <header class="bg-primary">
        <div class="container">
            <div class="py-2 row m-0 justify-content-between align-items-center">
                <h2 class="m-0 py-2 col-3">Cerca il Meteo</h2>
                <div class="m-0 py-2 col-3">
                    <input type="search" name="" id="" placeholder="Nome della Città">
                    <button type="submit" class="px-2 py-2 ms-2 rounded-2">Cerca</button>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped></style>