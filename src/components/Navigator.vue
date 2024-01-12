<template>
    <div class="flex items-center bg-[#fff]">
        <component
            v-for="link in links"
            :is="link.isActive ? 'router-link' : 'div'"
            :key="link.name"
            :to="link.path"
            class="link flex flex-grow flex-col items-center justify-center gap-[2px] border-t border-gray-200 py-[2px]"
            @click="linkOnclick(link)"
        >
            <div class="link-img h-[32px] w-[40px]" :class="link.name"></div>
            <span class="text-xs text-[#939393]">{{ link.text }}</span>
        </component>
    </div>
</template>

<script>
export default {
    name: "Navigator",
    data: () => ({
        links: [
            {
                name: "record",
                text: "Record",
                path: "/record",
                imgPath: require("/public/assets/imgs/components/navigator/record-icon.svg"),
                isActive: false,
            },
            {
                name: "bet",
                text: "Bet Now",
                path: "/matches",
                imgPath: require("/public/assets/imgs/components/navigator/bet-icon.svg"),
                isActive: true,
            },
            {
                name: "wallet",
                text: "Wallet",
                path: "/wallet",
                imgPath: require("/public/assets/imgs/components/navigator/wallet-icon.svg"),
                isActive: false,
            },
        ],
    }),
    methods: {
        linkOnclick(link) {
            if (!link.isActive) {
                window.Telegram.WebApp.showAlert("Coming soon!");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.link {
    .link-img {
        &.record {
            background-image: url("/public/assets/imgs/components/navigator/record-icon.svg");
        }
        &.bet {
            background-image: url("/public/assets/imgs/components/navigator/bet-icon.svg");
        }
        &.wallet {
            background-image: url("/public/assets/imgs/components/navigator/wallet-icon.svg");
        }
    }

    &.router-link-active {
        .link-img {
            &.record {
                background-image: url("/public/assets/imgs/components/navigator/record-icon-active.svg");
            }
            &.bet {
                background-image: url("/public/assets/imgs/components/navigator/bet-icon-active.svg");
            }
            &.wallet {
                background-image: url("/public/assets/imgs/components/navigator/wallet-icon-active.svg");
            }
        }
        span {
            color: #e84142 !important;
        }
    }
}
</style>
