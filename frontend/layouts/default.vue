<template>
    <div>
        <nav
            class="fixed top-0 left-0 w-full
            flex items-center justify-between py-20 px-[10%]"
        >
            <NuxtLink to="/" class="text-24 font-600">
                SiN.music
            </NuxtLink>

            <Button to="/login">
                Login
                <Icon icon-name="bx bx-log-in" />
            </Button>
        </nav>

        <slot />
    </div>
</template>
