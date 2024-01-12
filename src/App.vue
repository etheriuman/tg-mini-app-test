<template>
    <div
        id="app"
        class="flex h-screen max-h-screen w-screen flex-col justify-between"
    >
        <div class="flex-grow overflow-auto">
            <router-view />
        </div>
        <Navigator v-show="isCurrentRootRoute" class="w-full" />
    </div>
</template>

<script>
import Navigator from "@/components/Navigator.vue";

export default {
    name: "App",
    components: {
        Navigator,
    },
    data: () => ({
        isCurrentRootRoute: true,
    }),
    watch: {
        $route(to, from) {
            console.log("to: ", to);
            console.log("from: ", from);
            // if (to.matched[0] && to.matched[0].name === to.name) {
            //     this.isCurrentRootRoute = true;
            //     window.Telegram.WebApp.BackButton.hide();
            // } else {
            //     this.isCurrentRootRoute = false;
            //     window.Telegram.WebApp.BackButton.show();
            // }
            if (to.name !== "matches") {
                window.Telegram.WebApp.BackButton.show();
            } else {
                window.Telegram.WebApp.BackButton.hide();
            }
        },
    },
    methods: {
        handleTelegramBackBtnClicked() {
            window.Telegram.WebApp.onEvent("backButtonClicked", () => {
                console.log("back button clicked");
                // this.$router.push({ name: this.$route.matched[0].name });
                this.$router.push({ name: "index" });
            });
        },
        tgInit() {
            if (window.Telegram && window.Telegram.WebApp) {
                const webApp = window.Telegram.WebApp;
                console.log(window.Telegram.WebApp);
                webApp.expand();
                webApp.enableClosingConfirmation();
                // set theme colors
                console.log("theme color: ", webApp.themeParams);
                // webApp.showAlert("Hi from OCC");
                webApp.showPopup({
                    title: "popup",
                    message: "message",
                    buttons: [
                        {
                            type: "close",
                            text: "text",
                        },
                    ],
                });
                // webApp.showConfirm("confirm now?", () => {
                //     webApp.showAlert("CONFIRM");
                // });
            } else {
                console.error("Telegram or Telegram.WebApp is not available.");
            }
        },
    },
    created() {
        this.tgInit();
        this.handleTelegramBackBtnClicked();
    },
};
</script>
