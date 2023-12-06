import React from "react";
import logo from "./images/logo.png";
import "./App.css";

import { Button } from "./components/Button";

declare global {
    interface Window {
        Telegram?: {
            WebApp: any; // 根据实际情况定义 WebApp 的类型
        };
    }
}

function App() {
    function handleProductBtnOnclick(productName: string) {
        if (window.Telegram && window.Telegram.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.showAlert(`Buy ${productName}`);
        }
    }

    const products = [
        {
            id: 0,
            name: "Lemon",
        },
        {
            id: 1,
            name: "Melon",
        },
        {
            id: 2,
            name: "Berry",
        },
    ];

    return (
        <div className="flex w-screen flex-col items-center gap-10">
            <img className="w-[200px]" src={logo} alt="logo" />
            <div className=" flex w-full flex-col items-center justify-center gap-5 px-5">
                {products.map((product) => (
                    <div className="flex items-center gap-5" key={product.id}>
                        <img
                            className="w-10 rounded-full"
                            src="https://media.giphy.com/media/VRKheDy4DkBMrQm66p/giphy.gif"
                            alt=""
                        />
                        <Button
                            buttonText={product.name}
                            onClickCallback={() =>
                                handleProductBtnOnclick(product.name)
                            }
                        ></Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ******** initialize telegram mini app ********
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

export default App;
