<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    tgInit() {
      if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      console.log(window.Telegram.WebApp);
      webApp.expand();
      webApp.enableClosingConfirmation();
      webApp.BackButton.show();
      webApp.MainButton.show();
      webApp.MainButton.setText("Greeting");
      webApp.onEvent("mainButtonClicked", () => {
          console.log("main button clicked");
          webApp.showAlert("Hi from OCC");
      });
      webApp.onEvent("backButtonClicked", () => {
          console.log("back button clicked");
          webApp.close();
      });
      // set theme colors
      console.log("theme color: ", webApp.themeParams);
  } else {
      console.error("Telegram or Telegram.WebApp is not available.");
  }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
