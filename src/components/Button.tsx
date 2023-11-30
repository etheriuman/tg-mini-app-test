export function Button({
    buttonText,
    onClickCallback,
}: {
    buttonText: string;
    onClickCallback: Function;
}) {
    const handleClick = () => {
        if (onClickCallback) {
            onClickCallback();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="h-[20px] w-[80px] rounded-md bg-[var(--main-color)]"
        >
            <span className="text-[var(--tg-theme-button-text-color)]">
                {buttonText}
            </span>
        </button>
    );
}
